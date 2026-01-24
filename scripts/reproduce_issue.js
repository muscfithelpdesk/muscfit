
const { createClient } = require('@supabase/supabase-js');
const { randomUUID } = require('crypto');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Setup Env
const envPath = path.resolve(__dirname, '../.env');
const localEnvPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(localEnvPath)) {
    dotenv.config({ path: localEnvPath });
} else {
    dotenv.config({ path: envPath });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use Service Role if available to bypass RLS for debugging

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing credentials");
    process.exit(1);
}

// NOTE: We use the SERVICE ROLE key here to verify if it's an RLS issue. 
// If this works but frontend fails, it's RLS.
const supabase = createClient(supabaseUrl, supabaseServiceKey || supabaseKey);

const TEST_LEGACY_ID = "legacy-test-id-" + Date.now();
const TARGET_UUID = randomUUID();

async function runTest() {
    console.log("🚀 Starting Reproduction Test...");
    console.log(`📝 Attempting to UPDATE a non-existent legacy ID: ${TEST_LEGACY_ID}`);

    const updates = {
        name: "Legacy Test Product",
        price: 5000,
        description: "Updated Description",
        isActive: true,
        stockQuantity: 10,
        category: "tshirts",
        gender: "men",
        tag: "NEW",
        brand: "MUSCFIT"
    };

    // 1. MIMIC productService.updateProduct Logic
    // ... Copying logic from productService.js roughly ...

    // A. Try standard update
    console.log("   --- Step A: Standard Update ---");
    const { data: updateData, error: updateError } = await supabase
        .from('products')
        .update({ price: updates.price })
        .eq('id', TEST_LEGACY_ID)
        .select();

    if (updateError) {
        console.error("❌ Step A Error:", updateError.message);
    } else {
        console.log(`   Step A Result: ${updateData.length} rows updated.`);
    }

    // B. If rows=0, Try Migration (Insert)
    if (!updateData || updateData.length === 0) {
        console.log("   ⚠️ Rows = 0. Simulating Migration Logic...");

        let newId = TEST_LEGACY_ID;
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(TEST_LEGACY_ID);

        if (!isUuid) {
            console.log("   🔄 ID is not UUID. Generating new UUID...");
            newId = TARGET_UUID;
        }

        console.log(`   📝 Inserting with New ID: ${newId}`);

        const insertPayload = {
            id: newId,
            name: updates.name,
            description: updates.description,
            price: updates.price,
            stock_quantity: updates.stockQuantity,
            is_active: updates.isActive,
            category: updates.category,
            gender: updates.gender,
            brand: updates.brand,
            tag: updates.tag,
            rating: 0,
            review_count: 0
        };

        const { data: insertData, error: insertError } = await supabase
            .from('products')
            .insert(insertPayload)
            .select()
            .single();

        if (insertError) {
            console.error("❌ Step B (Migration) FAILED:", insertError.message);
            console.error("   Details:", insertError.details, insertError.hint);
        } else {
            console.log("✅ Step B (Migration) SUCCESS!");
            console.log("   Inserted Data:", insertData);

            // Cleanup
            console.log("   🧹 Cleaning up...");
            await supabase.from('products').delete().eq('id', newId);
        }
    }
}

runTest();
