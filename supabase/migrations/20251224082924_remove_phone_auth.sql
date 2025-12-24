-- Location: supabase/migrations/20251224082924_remove_phone_auth.sql
-- Purpose: Remove phone authentication migration (not needed)
-- Note: Phone authentication is controlled through Supabase Dashboard settings, not SQL migrations

-- This migration file should be deleted as auth.users table modifications
-- are not permitted through migrations. The table is owned by Supabase Auth.

-- To disable phone authentication:
-- 1. Go to Supabase Dashboard → Authentication → Providers
-- 2. Disable Phone authentication provider
-- 3. This will prevent new phone signups while preserving existing email auth

-- The auth.users table is managed by Supabase and cannot be modified via migrations.
-- Any attempts to UPDATE, ALTER, or COMMENT ON auth.users will fail with:
-- ERROR: 42501: must be owner of relation users

-- This file can be safely deleted from your migrations folder.