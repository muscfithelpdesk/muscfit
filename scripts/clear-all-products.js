/**
 * Script to DELETE ALL PRODUCTS from the database
 * WARNING: This will permanently delete all products!
 * Use this to clear the catalog so you can add your own products.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env file');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function clearAllProducts() {
    try {
        console.log('🗑️  Starting to delete all products...\n');

        // Step 1: Get count of existing products
        const { count: productCount } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true });

        console.log(`📊 Found ${productCount} products in database`);

        if (productCount === 0) {
            console.log('✅ Database is already empty!');
            return;
        }

        // Step 2: Delete all product images first (foreign key constraint)
        console.log('\n🖼️  Deleting all product images...');
        const { error: imagesError } = await supabase
            .from('product_images')
            .delete()
            .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

        if (imagesError) {
            console.error('❌ Error deleting images:', imagesError);
        } else {
            console.log('✅ All product images deleted');
        }

        // Step 3: Delete all product variants (if exists)
        console.log('\n📦 Deleting all product variants...');
        const { error: variantsError } = await supabase
            .from('product_variants')
            .delete()
            .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

        if (variantsError) {
            console.error('❌ Error deleting variants:', variantsError);
        } else {
            console.log('✅ All product variants deleted');
        }

        // Step 4: Delete all product attributes (if exists)
        console.log('\n🏷️  Deleting all product attributes...');
        const { error: attributesError } = await supabase
            .from('product_attributes')
            .delete()
            .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

        if (attributesError) {
            console.error('❌ Error deleting attributes:', attributesError);
        } else {
            console.log('✅ All product attributes deleted');
        }

        // Step 5: Delete all products
        console.log('\n🗑️  Deleting all products...');
        const { error: productsError } = await supabase
            .from('products')
            .delete()
            .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

        if (productsError) {
            console.error('❌ Error deleting products:', productsError);
            throw productsError;
        }

        console.log('✅ All products deleted successfully!');

        // Step 6: Verify deletion
        const { count: finalCount } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true });

        console.log(`\n📊 Final product count: ${finalCount}`);

        if (finalCount === 0) {
            console.log('\n🎉 SUCCESS! Database is now empty.');
            console.log('✅ You can now add your own products via the admin panel.');
        } else {
            console.log('\n⚠️  Warning: Some products may still remain.');
        }

    } catch (error) {
        console.error('\n❌ Error clearing products:', error);
        process.exit(1);
    }
}

// Run the script
console.log('⚠️  WARNING: This will DELETE ALL PRODUCTS from the database!');
console.log('⚠️  This action CANNOT be undone!\n');

clearAllProducts();
