
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load Env
const envPath = path.resolve(__dirname, '../.env');
const localEnvPath = path.resolve(__dirname, '../.env.local');

if (fs.existsSync(localEnvPath)) {
    console.log(`Loading env from ${localEnvPath}`);
    dotenv.config({ path: localEnvPath });
} else {
    console.log(`Loading env from ${envPath}`);
    dotenv.config({ path: envPath });
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('--- CONNECTION TEST ---');
console.log(`URL: ${url ? 'Found' : 'MISSING'}`);
console.log(`KEY: ${key ? `Found (${key.substring(0, 10)}...)` : 'MISSING'}`);

if (!url || !key) {
    console.error('❌ Missing Credentials');
    process.exit(1);
}

const supabase = createClient(url, key);

async function test() {
    console.log('Attempting to fetch 1 product...');
    const { data, error } = await supabase.from('products').select('id, name').limit(1);

    if (error) {
        console.error('❌ CONNECTION FAILED');
        console.error(`Error Code: ${error.code}`);
        console.error(`Message: ${error.message}`);
        
        if (key.startsWith('sb_')) {
            console.error('\n⚠️ WARNING: Your KEY starts with "sb_". Standard Supabase Keys usually start with "eyJ" (JWT).');
            console.error('You might be using the wrong key format.');
        }
    } else {
        console.log('✅ CONNECTION SUCCESSFUL');
        console.log(`Retrieved ${data.length} rows.`);
    }
}

test();
