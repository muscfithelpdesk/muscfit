
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Try to load env from typical locations
const envPath = path.resolve(__dirname, '../.env');
const localEnvPath = path.resolve(__dirname, '../.env.local');

if (fs.existsSync(localEnvPath)) {
    dotenv.config({ path: localEnvPath });
} else {
    dotenv.config({ path: envPath });
}

// Fallback to searching in src if not found (Next.js typical)
// ..

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    console.log("Checking DB schema compatibility...");
    // Try to insert a non-uuid ID
    const testId = "test-text-id-" + Date.now();

    const { data, error } = await supabase.from('products').insert({
        id: testId,
        name: "Test Schema Type",
        price: 0,
        stock_quantity: 0
    });

    if (error) {
        if (error.message.includes("invalid input syntax for type uuid")) {
            console.log("RESULT: UUID_ONLY");
        } else {
            console.log("RESULT: ERROR: " + error.message);
        }
    } else {
        console.log("RESULT: TEXT_ALLOWED");
        // Cleanup
        await supabase.from('products').delete().eq('id', testId);
    }
}

check();
