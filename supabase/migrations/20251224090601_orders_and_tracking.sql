-- Location: supabase/migrations/20251224090601_orders_and_tracking.sql
-- Schema Analysis: Existing tables: products, user_profiles, promo_codes, promo_code_usage
-- Integration Type: New module addition (orders & order tracking)
-- Dependencies: user_profiles, products, promo_codes

-- 1. Create ENUMs for orders module
CREATE TYPE public.order_status AS ENUM (
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'out_for_delivery',
    'delivered',
    'cancelled',
    'refunded'
);

CREATE TYPE public.payment_status AS ENUM (
    'pending',
    'completed',
    'failed',
    'refunded'
);

CREATE TYPE public.payment_method AS ENUM (
    'credit_card',
    'debit_card',
    'upi',
    'net_banking',
    'cod',
    'wallet'
);

CREATE TYPE public.shipping_status AS ENUM (
    'order_confirmed',
    'processing',
    'shipped',
    'out_for_delivery',
    'delivered'
);

-- 2. Create orders table
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    order_number TEXT NOT NULL UNIQUE,
    order_status public.order_status DEFAULT 'pending'::public.order_status,
    payment_status public.payment_status DEFAULT 'pending'::public.payment_status,
    payment_method public.payment_method,
    subtotal DECIMAL(10,2) NOT NULL,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    shipping_cost DECIMAL(10,2) DEFAULT 0,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    promo_code_id UUID REFERENCES public.promo_codes(id) ON DELETE SET NULL,
    shipping_address JSONB NOT NULL,
    billing_address JSONB,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create order_items table
CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
    product_name TEXT NOT NULL,
    product_image TEXT,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    total_price DECIMAL(10,2) NOT NULL,
    size TEXT,
    color TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create order_tracking table
CREATE TABLE public.order_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    status public.shipping_status NOT NULL,
    location TEXT,
    description TEXT NOT NULL,
    tracking_number TEXT,
    courier_name TEXT,
    estimated_delivery TIMESTAMPTZ,
    actual_delivery TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 5. Create indexes
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_order_number ON public.orders(order_number);
CREATE INDEX idx_orders_status ON public.orders(order_status);
CREATE INDEX idx_orders_created_at ON public.orders(created_at DESC);

CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_order_items_product_id ON public.order_items(product_id);

CREATE INDEX idx_order_tracking_order_id ON public.order_tracking(order_id);
CREATE INDEX idx_order_tracking_status ON public.order_tracking(status);
CREATE INDEX idx_order_tracking_created_at ON public.order_tracking(created_at DESC);

-- 6. Create function to generate order number
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
    new_order_number TEXT;
    order_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO order_count FROM public.orders;
    new_order_number := 'ORD-' || TO_CHAR(CURRENT_DATE, 'YYYYMMDD') || '-' || LPAD((order_count + 1)::TEXT, 5, '0');
    RETURN new_order_number;
END;
$$;

-- 7. Create trigger to auto-generate order number
CREATE OR REPLACE FUNCTION public.set_order_number()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    IF NEW.order_number IS NULL THEN
        NEW.order_number := public.generate_order_number();
    END IF;
    RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_set_order_number
    BEFORE INSERT ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION public.set_order_number();

-- 8. Create function to update order timestamps
CREATE OR REPLACE FUNCTION public.handle_order_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_order_updated_at();

CREATE TRIGGER trigger_order_tracking_updated_at
    BEFORE UPDATE ON public.order_tracking
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_order_updated_at();

-- 9. Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_tracking ENABLE ROW LEVEL SECURITY;

-- 10. Create RLS policies using Pattern 2 (Simple User Ownership)
CREATE POLICY "users_manage_own_orders"
ON public.orders
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- For order_items, use helper function to check order ownership
CREATE OR REPLACE FUNCTION public.user_owns_order(order_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.orders o
        WHERE o.id = order_uuid AND o.user_id = auth.uid()
    )
$$;

CREATE POLICY "users_manage_own_order_items"
ON public.order_items
FOR ALL
TO authenticated
USING (public.user_owns_order(order_id))
WITH CHECK (public.user_owns_order(order_id));

CREATE POLICY "users_view_own_order_tracking"
ON public.order_tracking
FOR SELECT
TO authenticated
USING (public.user_owns_order(order_id));

-- 11. Admin policies (using Pattern 6 - Option A)
CREATE POLICY "admin_full_access_orders"
ON public.orders
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

CREATE POLICY "admin_full_access_order_items"
ON public.order_items
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

CREATE POLICY "admin_manage_order_tracking"
ON public.order_tracking
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

-- 12. Mock data - Reference existing users and products
DO $$
DECLARE
    existing_user_id UUID;
    existing_product_id UUID;
    sample_order_id UUID := gen_random_uuid();
    sample_order_id2 UUID := gen_random_uuid();
BEGIN
    -- Get existing user and product IDs
    SELECT id INTO existing_user_id FROM public.user_profiles LIMIT 1;
    SELECT id INTO existing_product_id FROM public.products LIMIT 1;

    -- Only create mock data if user and product exist
    IF existing_user_id IS NOT NULL AND existing_product_id IS NOT NULL THEN
        -- Create sample orders
        INSERT INTO public.orders (
            id, user_id, order_number, order_status, payment_status, payment_method,
            subtotal, discount_amount, shipping_cost, tax_amount, total_amount,
            shipping_address, billing_address
        ) VALUES
        (
            sample_order_id, existing_user_id, 'ORD-20251224-00001', 
            'shipped'::public.order_status, 'completed'::public.payment_status, 'upi'::public.payment_method,
            2499.00, 250.00, 100.00, 224.90, 2573.90,
            '{"name": "John Doe", "phone": "+91 9876543210", "address": "123 MG Road", "city": "Mumbai", "state": "Maharashtra", "pincode": "400001"}'::jsonb,
            '{"name": "John Doe", "phone": "+91 9876543210", "address": "123 MG Road", "city": "Mumbai", "state": "Maharashtra", "pincode": "400001"}'::jsonb
        ),
        (
            sample_order_id2, existing_user_id, 'ORD-20251224-00002',
            'processing'::public.order_status, 'completed'::public.payment_status, 'credit_card'::public.payment_method,
            1799.00, 0.00, 100.00, 161.91, 2060.91,
            '{"name": "John Doe", "phone": "+91 9876543210", "address": "123 MG Road", "city": "Mumbai", "state": "Maharashtra", "pincode": "400001"}'::jsonb,
            '{"name": "John Doe", "phone": "+91 9876543210", "address": "123 MG Road", "city": "Mumbai", "state": "Maharashtra", "pincode": "400001"}'::jsonb
        );

        -- Create sample order items
        INSERT INTO public.order_items (
            order_id, product_id, product_name, product_image, quantity, 
            unit_price, discount_amount, total_price, size, color
        )
        SELECT 
            sample_order_id, 
            id, 
            name, 
            (SELECT image_url FROM public.product_images WHERE product_id = products.id LIMIT 1),
            1,
            price,
            0,
            price,
            'M',
            'Black'
        FROM public.products 
        WHERE id = existing_product_id
        LIMIT 1;

        INSERT INTO public.order_items (
            order_id, product_id, product_name, product_image, quantity,
            unit_price, discount_amount, total_price, size, color
        )
        SELECT 
            sample_order_id2,
            id,
            name,
            (SELECT image_url FROM public.product_images WHERE product_id = products.id LIMIT 1),
            2,
            price,
            0,
            price * 2,
            'L',
            'Navy'
        FROM public.products
        WHERE id = existing_product_id
        LIMIT 1;

        -- Create sample order tracking
        INSERT INTO public.order_tracking (
            order_id, status, location, description, tracking_number, 
            courier_name, estimated_delivery, created_at
        ) VALUES
        (
            sample_order_id, 'order_confirmed'::public.shipping_status, 
            'Mumbai Warehouse', 'Order confirmed and payment received',
            'TRK' || LPAD(floor(random() * 1000000000)::TEXT, 10, '0'),
            'BlueDart', CURRENT_TIMESTAMP + INTERVAL '2 days',
            CURRENT_TIMESTAMP - INTERVAL '2 days'
        ),
        (
            sample_order_id, 'processing'::public.shipping_status,
            'Mumbai Warehouse', 'Order is being processed and packed',
            'TRK' || LPAD(floor(random() * 1000000000)::TEXT, 10, '0'),
            'BlueDart', CURRENT_TIMESTAMP + INTERVAL '2 days',
            CURRENT_TIMESTAMP - INTERVAL '1 day'
        ),
        (
            sample_order_id, 'shipped'::public.shipping_status,
            'Mumbai Distribution Center', 'Package has been shipped',
            'TRK' || LPAD(floor(random() * 1000000000)::TEXT, 10, '0'),
            'BlueDart', CURRENT_TIMESTAMP + INTERVAL '1 day',
            CURRENT_TIMESTAMP - INTERVAL '12 hours'
        ),
        (
            sample_order_id2, 'order_confirmed'::public.shipping_status,
            'Delhi Warehouse', 'Order confirmed and payment received',
            'TRK' || LPAD(floor(random() * 1000000000)::TEXT, 10, '0'),
            'Delhivery', CURRENT_TIMESTAMP + INTERVAL '3 days',
            CURRENT_TIMESTAMP - INTERVAL '1 day'
        ),
        (
            sample_order_id2, 'processing'::public.shipping_status,
            'Delhi Warehouse', 'Order is being processed and packed',
            'TRK' || LPAD(floor(random() * 1000000000)::TEXT, 10, '0'),
            'Delhivery', CURRENT_TIMESTAMP + INTERVAL '3 days',
            CURRENT_TIMESTAMP - INTERVAL '6 hours'
        );
    ELSE
        RAISE NOTICE 'No existing users or products found. Skipping mock order data creation.';
    END IF;
END $$;