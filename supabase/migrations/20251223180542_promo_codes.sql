-- Location: supabase/migrations/20251223180542_promo_codes.sql
-- Schema Analysis: Existing user_profiles table with id, email, full_name, avatar_url, created_at, updated_at
-- Integration Type: New promo code management system
-- Dependencies: user_profiles for admin relationship

-- 1. Create promo code status enum
CREATE TYPE public.promo_code_status AS ENUM ('active', 'expired', 'disabled');

-- 2. Create promo codes table
CREATE TABLE public.promo_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE,
    discount_percentage INTEGER NOT NULL CHECK (discount_percentage > 0 AND discount_percentage <= 100),
    max_uses INTEGER NOT NULL DEFAULT 1,
    current_uses INTEGER NOT NULL DEFAULT 0,
    status public.promo_code_status DEFAULT 'active'::public.promo_code_status,
    valid_from TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMPTZ NOT NULL,
    created_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_valid_dates CHECK (valid_until > valid_from),
    CONSTRAINT check_uses CHECK (current_uses <= max_uses)
);

-- 3. Create promo code usage tracking table
CREATE TABLE public.promo_code_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    promo_code_id UUID REFERENCES public.promo_codes(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    used_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    order_id UUID,
    UNIQUE(promo_code_id, user_id)
);

-- 4. Create indexes
CREATE INDEX idx_promo_codes_code ON public.promo_codes(code);
CREATE INDEX idx_promo_codes_status ON public.promo_codes(status);
CREATE INDEX idx_promo_codes_valid_until ON public.promo_codes(valid_until);
CREATE INDEX idx_promo_code_usage_promo_code_id ON public.promo_code_usage(promo_code_id);
CREATE INDEX idx_promo_code_usage_user_id ON public.promo_code_usage(user_id);

-- 5. Create function to check if user is admin (using auth metadata)
CREATE OR REPLACE FUNCTION public.is_admin_from_auth()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM auth.users au
    WHERE au.id = auth.uid() 
    AND (au.raw_user_meta_data->>'role' = 'admin' 
         OR au.raw_app_meta_data->>'role' = 'admin')
)
$$;

-- 6. Create function to validate and apply promo code
CREATE OR REPLACE FUNCTION public.validate_promo_code(promo_code_text TEXT)
RETURNS TABLE(
    is_valid BOOLEAN,
    discount_percentage INTEGER,
    message TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $func$
DECLARE
    code_record RECORD;
BEGIN
    -- Get promo code details
    SELECT * INTO code_record
    FROM public.promo_codes
    WHERE code = promo_code_text;

    -- Check if code exists
    IF NOT FOUND THEN
        RETURN QUERY SELECT false, 0, 'Invalid promo code'::TEXT;
        RETURN;
    END IF;

    -- Check if code is active
    IF code_record.status != 'active' THEN
        RETURN QUERY SELECT false, 0, 'Promo code is not active'::TEXT;
        RETURN;
    END IF;

    -- Check if code has expired
    IF code_record.valid_until < CURRENT_TIMESTAMP THEN
        RETURN QUERY SELECT false, 0, 'Promo code has expired'::TEXT;
        RETURN;
    END IF;

    -- Check if code is not yet valid
    IF code_record.valid_from > CURRENT_TIMESTAMP THEN
        RETURN QUERY SELECT false, 0, 'Promo code is not yet valid'::TEXT;
        RETURN;
    END IF;

    -- Check if code has reached max uses
    IF code_record.current_uses >= code_record.max_uses THEN
        RETURN QUERY SELECT false, 0, 'Promo code usage limit reached'::TEXT;
        RETURN;
    END IF;

    -- Check if user has already used this code
    IF EXISTS (
        SELECT 1 FROM public.promo_code_usage
        WHERE promo_code_id = code_record.id
        AND user_id = auth.uid()
    ) THEN
        RETURN QUERY SELECT false, 0, 'You have already used this promo code'::TEXT;
        RETURN;
    END IF;

    -- Code is valid
    RETURN QUERY SELECT true, code_record.discount_percentage, 'Promo code applied successfully'::TEXT;
END;
$func$;

-- 7. Create function to increment promo code usage
CREATE OR REPLACE FUNCTION public.increment_promo_code_usage()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $func$
BEGIN
    UPDATE public.promo_codes
    SET current_uses = current_uses + 1,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.promo_code_id;
    RETURN NEW;
END;
$func$;

-- 8. Create trigger for promo code usage
CREATE TRIGGER trigger_increment_promo_code_usage
AFTER INSERT ON public.promo_code_usage
FOR EACH ROW
EXECUTE FUNCTION public.increment_promo_code_usage();

-- 9. Create function to update promo code status based on expiry
CREATE OR REPLACE FUNCTION public.update_expired_promo_codes()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $func$
BEGIN
    UPDATE public.promo_codes
    SET status = 'expired'::public.promo_code_status,
        updated_at = CURRENT_TIMESTAMP
    WHERE valid_until < CURRENT_TIMESTAMP
    AND status = 'active'::public.promo_code_status;
END;
$func$;

-- 10. Create function to handle updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_promo_code_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $func$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$func$;

-- 11. Create trigger for updated_at
CREATE TRIGGER trigger_promo_codes_updated_at
BEFORE UPDATE ON public.promo_codes
FOR EACH ROW
EXECUTE FUNCTION public.handle_promo_code_updated_at();

-- 12. Enable RLS
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_code_usage ENABLE ROW LEVEL SECURITY;

-- 13. Create RLS policies for promo_codes
-- Public can read active promo codes (for validation)
CREATE POLICY "public_read_active_promo_codes"
ON public.promo_codes
FOR SELECT
TO public
USING (status = 'active'::public.promo_code_status AND valid_until > CURRENT_TIMESTAMP);

-- Admins can manage all promo codes
CREATE POLICY "admin_full_access_promo_codes"
ON public.promo_codes
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

-- 14. Create RLS policies for promo_code_usage
-- Users can view their own usage
CREATE POLICY "users_view_own_promo_usage"
ON public.promo_code_usage
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Users can create their own usage records
CREATE POLICY "users_create_own_promo_usage"
ON public.promo_code_usage
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- Admins can view all usage
CREATE POLICY "admin_view_all_promo_usage"
ON public.promo_code_usage
FOR SELECT
TO authenticated
USING (public.is_admin_from_auth());

-- 15. Create mock data
DO $$
DECLARE
    existing_admin_id UUID;
    promo_code1_id UUID := gen_random_uuid();
    promo_code2_id UUID := gen_random_uuid();
    promo_code3_id UUID := gen_random_uuid();
BEGIN
    -- Get existing admin user (assuming one exists with admin role in metadata)
    SELECT id INTO existing_admin_id 
    FROM public.user_profiles 
    LIMIT 1;

    -- If no users exist, create a note
    IF existing_admin_id IS NULL THEN
        RAISE NOTICE 'No existing users found. Promo codes will be created without a creator.';
    END IF;

    -- Create sample promo codes
    INSERT INTO public.promo_codes (id, code, discount_percentage, max_uses, valid_from, valid_until, created_by, status)
    VALUES
        (promo_code1_id, 'WELCOME20', 20, 100, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '30 days', existing_admin_id, 'active'::public.promo_code_status),
        (promo_code2_id, 'SAVE50', 50, 50, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '7 days', existing_admin_id, 'active'::public.promo_code_status),
        (promo_code3_id, 'SPECIAL30', 30, 200, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '60 days', existing_admin_id, 'active'::public.promo_code_status);

    RAISE NOTICE 'Sample promo codes created: WELCOME20 (20%% off), SAVE50 (50%% off), SPECIAL30 (30%% off)';
END $$;