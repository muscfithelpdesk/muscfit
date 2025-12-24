-- Location: supabase/migrations/20251224091719_inventory_sync_notifications.sql
-- Schema Analysis: Existing products, product_variants, orders, order_items tables
-- Integration Type: Extension - Add inventory tracking and synchronization
-- Dependencies: products, product_variants, orders, order_items, user_profiles

-- ============================================================================
-- PART 1: ENUM TYPES & TABLES
-- ============================================================================

-- Notification level for stock alerts
CREATE TYPE public.notification_level AS ENUM ('low', 'critical', 'out_of_stock');

-- Stock notifications table to track inventory alerts
CREATE TABLE public.stock_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES public.product_variants(id) ON DELETE CASCADE,
    notification_level public.notification_level NOT NULL,
    current_stock INTEGER NOT NULL,
    threshold_stock INTEGER NOT NULL,
    message TEXT NOT NULL,
    is_resolved BOOLEAN DEFAULT false,
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- PART 2: INDEXES
-- ============================================================================

CREATE INDEX idx_stock_notifications_product_id ON public.stock_notifications(product_id);
CREATE INDEX idx_stock_notifications_variant_id ON public.stock_notifications(variant_id);
CREATE INDEX idx_stock_notifications_level ON public.stock_notifications(notification_level);
CREATE INDEX idx_stock_notifications_resolved ON public.stock_notifications(is_resolved);

-- ============================================================================
-- PART 3: FUNCTIONS (MUST BE BEFORE RLS POLICIES)
-- ============================================================================

-- Function to calculate total variant stock for a product
CREATE OR REPLACE FUNCTION public.calculate_product_total_stock(product_uuid UUID)
RETURNS INTEGER
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
    SELECT COALESCE(SUM(pv.stock_quantity), 0)::INTEGER
    FROM public.product_variants pv
    WHERE pv.product_id = product_uuid
$$;

-- Function to sync product stock from variants
CREATE OR REPLACE FUNCTION public.sync_product_stock_from_variants()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Update the parent product stock_quantity based on sum of all variants
    UPDATE public.products p
    SET stock_quantity = public.calculate_product_total_stock(p.id),
        updated_at = CURRENT_TIMESTAMP
    WHERE p.id = COALESCE(NEW.product_id, OLD.product_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$;

-- Function to check and create stock notifications
CREATE OR REPLACE FUNCTION public.check_stock_levels()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    low_threshold INTEGER := 20;
    critical_threshold INTEGER := 10;
    notification_msg TEXT;
    notification_lvl public.notification_level;
BEGIN
    -- Determine notification level and message based on stock
    IF NEW.stock_quantity = 0 THEN
        notification_lvl := 'out_of_stock'::public.notification_level;
        notification_msg := 'Product variant is out of stock';
    ELSIF NEW.stock_quantity <= critical_threshold THEN
        notification_lvl := 'critical'::public.notification_level;
        notification_msg := 'Critical stock level - only ' || NEW.stock_quantity || ' units remaining';
    ELSIF NEW.stock_quantity <= low_threshold THEN
        notification_lvl := 'low'::public.notification_level;
        notification_msg := 'Low stock level - ' || NEW.stock_quantity || ' units remaining';
    ELSE
        -- Stock is adequate, resolve any existing notifications
        UPDATE public.stock_notifications
        SET is_resolved = true,
            resolved_at = CURRENT_TIMESTAMP
        WHERE variant_id = NEW.id 
        AND is_resolved = false;
        RETURN NEW;
    END IF;
    
    -- Check if unresolved notification already exists
    IF NOT EXISTS (
        SELECT 1 FROM public.stock_notifications
        WHERE variant_id = NEW.id 
        AND is_resolved = false
        AND notification_level = notification_lvl
    ) THEN
        -- Create new notification
        INSERT INTO public.stock_notifications (
            product_id,
            variant_id,
            notification_level,
            current_stock,
            threshold_stock,
            message
        ) VALUES (
            NEW.product_id,
            NEW.id,
            notification_lvl,
            NEW.stock_quantity,
            CASE 
                WHEN notification_lvl = 'critical'::public.notification_level THEN critical_threshold
                ELSE low_threshold
            END,
            notification_msg
        );
    END IF;
    
    RETURN NEW;
END;
$$;

-- Function to prevent overselling by validating stock before order
CREATE OR REPLACE FUNCTION public.validate_stock_before_order()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    available_stock INTEGER;
    variant_record RECORD;
BEGIN
    -- Find matching variant for this order item
    SELECT * INTO variant_record
    FROM public.product_variants pv
    WHERE pv.product_id = NEW.product_id
    AND pv.size = NEW.size
    AND pv.color = NEW.color
    LIMIT 1;
    
    IF variant_record IS NULL THEN
        RAISE EXCEPTION 'Product variant not found for product_id: %, size: %, color: %', 
            NEW.product_id, NEW.size, NEW.color;
    END IF;
    
    available_stock := variant_record.stock_quantity;
    
    -- Check if sufficient stock exists
    IF available_stock < NEW.quantity THEN
        RAISE EXCEPTION 'Insufficient stock. Available: %, Requested: %', 
            available_stock, NEW.quantity;
    END IF;
    
    RETURN NEW;
END;
$$;

-- Function to update stock after order is placed
CREATE OR REPLACE FUNCTION public.update_stock_after_order()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Decrease stock quantity for the specific variant
    UPDATE public.product_variants pv
    SET stock_quantity = stock_quantity - NEW.quantity
    WHERE pv.product_id = NEW.product_id
    AND pv.size = NEW.size
    AND pv.color = NEW.color;
    
    RETURN NEW;
END;
$$;

-- Function to restore stock when order is cancelled
CREATE OR REPLACE FUNCTION public.restore_stock_on_cancel()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    order_item_record RECORD;
BEGIN
    -- Only restore if order status changed to cancelled or refunded
    IF NEW.order_status IN ('cancelled', 'refunded') 
       AND OLD.order_status NOT IN ('cancelled', 'refunded') THEN
        
        -- Restore stock for all items in this order
        FOR order_item_record IN 
            SELECT product_id, size, color, quantity
            FROM public.order_items
            WHERE order_id = NEW.id
        LOOP
            UPDATE public.product_variants pv
            SET stock_quantity = stock_quantity + order_item_record.quantity
            WHERE pv.product_id = order_item_record.product_id
            AND pv.size = order_item_record.size
            AND pv.color = order_item_record.color;
        END LOOP;
    END IF;
    
    RETURN NEW;
END;
$$;

-- Function to handle notification updated_at
CREATE OR REPLACE FUNCTION public.handle_notification_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- ============================================================================
-- PART 4: ENABLE RLS
-- ============================================================================

ALTER TABLE public.stock_notifications ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- PART 5: RLS POLICIES
-- ============================================================================

-- Admins can view and manage all stock notifications
CREATE POLICY "admin_full_access_stock_notifications"
ON public.stock_notifications
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

-- Public users can view active (unresolved) stock notifications for available products
CREATE POLICY "public_view_active_stock_notifications"
ON public.stock_notifications
FOR SELECT
TO public
USING (is_resolved = false);

-- ============================================================================
-- PART 6: TRIGGERS
-- ============================================================================

-- Trigger to sync product stock whenever variant stock changes
CREATE TRIGGER trigger_sync_product_stock_from_variants
AFTER INSERT OR UPDATE OR DELETE ON public.product_variants
FOR EACH ROW
EXECUTE FUNCTION public.sync_product_stock_from_variants();

-- Trigger to check stock levels and create notifications after variant updates
CREATE TRIGGER trigger_check_stock_levels
AFTER INSERT OR UPDATE ON public.product_variants
FOR EACH ROW
EXECUTE FUNCTION public.check_stock_levels();

-- Trigger to validate stock before creating order items
CREATE TRIGGER trigger_validate_stock_before_order
BEFORE INSERT ON public.order_items
FOR EACH ROW
EXECUTE FUNCTION public.validate_stock_before_order();

-- Trigger to update stock after order items are created
CREATE TRIGGER trigger_update_stock_after_order
AFTER INSERT ON public.order_items
FOR EACH ROW
EXECUTE FUNCTION public.update_stock_after_order();

-- Trigger to restore stock when order is cancelled
CREATE TRIGGER trigger_restore_stock_on_cancel
AFTER UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.restore_stock_on_cancel();

-- Trigger to handle notification updated_at
CREATE TRIGGER trigger_notification_updated_at
BEFORE UPDATE ON public.stock_notifications
FOR EACH ROW
EXECUTE FUNCTION public.handle_notification_updated_at();

-- ============================================================================
-- PART 7: MOCK DATA (NO AUTH USERS - INVENTORY MODULE)
-- ============================================================================

-- Note: No auth.users mock data needed for inventory management module
-- This migration only handles stock synchronization and notifications