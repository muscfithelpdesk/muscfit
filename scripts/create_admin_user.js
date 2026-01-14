
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hjllxlktwsesbimozwju.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_-jVRYrZQXISCwkVD-U2TvA_eNmTmX0K';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdmin() {
    const email = 'admin@muscfit.com';
    const password = 'AdminMuscfit2026!'; // Strong password

    console.log(`Attempting to create admin user: ${email}`);

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                role: 'admin',
                full_name: 'System Admin',
                phone: '+910000000000', // Dummy phone for profile sync
                fitness_goal: 'Management'
            },
        },
    });

    if (error) {
        console.error('Error creating admin user:', error.message);
        if (error.message.includes('already registered')) {
            console.log('User already exists. You might need to just log in or use the SQL update if the role is missing.');
        }
    } else {
        console.log('Admin user created successfully!');
        console.log('User ID:', data.user?.id);
        console.log('Role Metadata:', data.user?.user_metadata?.role);

        if (data.session) {
            console.log('Session active! Auto-login possible.');
        } else {
            console.log('Note: Email confirmation might be required depending on project settings.');
        }
    }
}

createAdmin();
