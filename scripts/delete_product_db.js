
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function deleteProduct() {
    console.log('🗑️ Starting product deletion...');

    const targetIds = ['compression-1'];
    const targetNames = ['VELD-TRACK COMPRESSION FULL SUIT'];

    // Delete by ID
    for (const id of targetIds) {
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) {
            console.error(`❌ Failed to delete by ID ${id}:`, error.message);
        } else {
            console.log(`✅ Deleted product with ID: ${id}`);
        }
    }

    // Delete by Name (Safety Net)
    for (const name of targetNames) {
        const { data, error } = await supabase.from('products').delete().eq('name', name).select();
        if (error) {
            console.error(`❌ Failed to delete by Name "${name}":`, error.message);
        } else {
            if (data && data.length > 0) {
                console.log(`✅ Deleted product(s) by name "${name}":`, data.length);
            } else {
                console.log(`ℹ️ No products found with name "${name}"`);
            }
        }
    }
}

deleteProduct();
