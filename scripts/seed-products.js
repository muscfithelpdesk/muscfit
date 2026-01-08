/**
 * Script to SEED products into the database
 * Restores the original catalogue but into the Database so it's editable.
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

const productsToSeed = [
    {
        name: "Elite Performance Compression Tee",
        price: 1899,
        original_price: 2499,
        image_url: "/assets/images/products/plain_black_tshirt_flat_lay_2_1767417716871.png",
        description: "High-performance compression tee designed for intense workouts. Features moisture-wicking fabric and muscle support.",
        tag: "BESTSELLER",
        category: "tshirts",
        gender: "men",
        stock_quantity: 150,
        is_active: true
    },
    {
        name: "Pro Training Joggers",
        price: 2299,
        original_price: 2999,
        image_url: "/assets/images/products/plain_gray_joggers_flat_lay_2_1767417737544.png",
        description: "Ultra-comfortable training joggers with tapered fit and breathable material.",
        tag: "HOT",
        category: "joggers",
        gender: "men",
        stock_quantity: 120,
        is_active: true
    },
    {
        name: "Women's Power Flex Leggings",
        price: 1699,
        original_price: 2199,
        image_url: "/assets/images/products/plain_black_leggings_flat_lay_1767417679501.png",
        description: "Squat-proof, high-waisted leggings providing maximum flexibility and comfort.",
        tag: "TRENDING",
        category: "leggings",
        gender: "women",
        stock_quantity: 200,
        is_active: true
    },
    {
        name: "Muscle Fit Tank Top",
        price: 999,
        original_price: 1499,
        image_url: "/assets/images/products/plain_white_tshirt_flat_lay_1767417660339.png",
        description: "Classic muscle fit tank top to show off your gains. Lightweight and airy.",
        tag: "SALE",
        category: "tshirts",
        gender: "men",
        stock_quantity: 180,
        is_active: true
    },
    {
        name: "Women's Sports Bra Elite",
        price: 1499,
        original_price: 1899,
        image_url: "/assets/images/products/plain_black_leggings_flat_lay_1767417679501.png", // Using leggings img as placeholder if specific bra img missing, or reusing valid one
        description: "High-support sports bra for running and HIIT sessions.",
        tag: "SALE",
        category: "tshirts", // We mapped 'SPORTS BRAS' tab to 'tshirts' or we should use accessories? Let's use 'tshirts' (tops)
        gender: "women",
        stock_quantity: 100,
        is_active: true
    },
    {
        name: "Performance Training Shorts",
        price: 1199,
        original_price: 1799,
        image_url: "/assets/images/products/plain_gray_joggers_flat_lay_2_1767417737544.png", // reusing gray theme
        description: "Lightweight shorts with zip pockets, perfect for leg day.",
        tag: "SALE",
        category: "shorts",
        gender: "men",
        stock_quantity: 160,
        is_active: true
    },
    {
        name: "Compression Arm Sleeves",
        price: 899,
        original_price: 1199,
        image_url: "/assets/images/products/plain_black_tshirt_flat_lay_2_1767417716871.png",
        description: "Enhance blood flow and recovery with these professional compression sleeves.",
        tag: "HOT",
        category: "accessories",
        gender: "unisex",
        stock_quantity: 300,
        is_active: true
    },
    {
        name: "Premium Gym Hoodie",
        price: 2799,
        original_price: 3499,
        image_url: "/assets/images/products/plain_gray_hoodie_flat_lay_1767417698358.png",
        description: "Heavyweight cotton hoodie to keep you warm pre and post workout.",
        tag: "NEW",
        category: "hoodies",
        gender: "men",
        stock_quantity: 90,
        is_active: true
    },
    {
        name: "Velocity Running Tights",
        price: 1999,
        original_price: 2499,
        image_url: "/assets/images/products/plain_black_leggings_flat_lay_1767417679501.png",
        description: "Streamlined running tights for speed and comfort.",
        tag: "NEW",
        category: "leggings",
        gender: "men", // or compression?
        stock_quantity: 80,
        is_active: true
    },
    {
        name: "Flex Fit Training Gloves",
        price: 799,
        original_price: 999,
        image_url: "/assets/images/products/plain_black_tshirt_flat_lay_2_1767417716871.png",
        description: "Protect your hands and improve grip strength.",
        tag: "NEW",
        category: "accessories",
        gender: "unisex",
        stock_quantity: 250,
        is_active: true
    },
    {
        name: "Performance Crew Socks",
        price: 499,
        image_url: "/assets/images/products/plain_white_tshirt_flat_lay_1767417660339.png",
        description: "Cushioned soles for maximum comfort during jumps and runs.",
        tag: "NEW",
        category: "accessories",
        gender: "unisex",
        stock_quantity: 500,
        is_active: true
    }
];

async function seedProducts() {
    try {
        console.log('🌱 Starting to seed products...\n');

        for (const p of productsToSeed) {
            console.log(`Adding ${p.name}...`);

            // Insert product
            const { data: product, error } = await supabase
                .from('products')
                .insert({
                    name: p.name,
                    description: p.description,
                    price: p.price,
                    original_price: p.original_price,
                    category: p.category,
                    gender: p.gender,
                    tag: p.tag,
                    stock_quantity: p.stock_quantity,
                    is_active: p.is_active
                })
                .select()
                .single();

            if (error) {
                console.error(`❌ Error adding ${p.name}:`, error.message);
                continue;
            }

            // Insert Image
            if (p.image_url) {
                const { error: imgError } = await supabase
                    .from('product_images')
                    .insert({
                        product_id: product.id,
                        image_url: p.image_url,
                        alt_text: p.name,
                        is_primary: true,
                        display_order: 1
                    });

                if (imgError) console.error(`   ⚠️ Image error for ${p.name}:`, imgError.message);
            }
        }

        console.log('\n✅ Seeding complete! The catalogue is back.');

    } catch (error) {
        console.error('\n❌ Error seeding:', error);
    }
}

seedProducts();
