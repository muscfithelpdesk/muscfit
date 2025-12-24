-- Location: supabase/migrations/20251224085610_products_catalog.sql
-- Schema Analysis: Existing tables: user_profiles, promo_codes, promo_code_usage
-- Integration Type: NEW_MODULE - Products catalog system
-- Dependencies: user_profiles (for wishlist and reviews)

-- 1. TYPES AND ENUMS
CREATE TYPE public.product_gender AS ENUM ('men', 'women', 'unisex', 'compression');
CREATE TYPE public.product_category AS ENUM ('tshirts', 'hoodies', 'shorts', 'joggers', 'accessories', 'compression_wear');
CREATE TYPE public.product_tag AS ENUM ('BESTSELLER', 'NEW', 'SALE', 'HOT', 'TRENDING', 'PRO', 'ELITE', 'RECOVERY');

-- 2. CORE TABLES
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    gender public.product_gender NOT NULL,
    category public.product_category NOT NULL,
    brand TEXT NOT NULL,
    rating DECIMAL(2,1) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    tag public.product_tag,
    is_active BOOLEAN DEFAULT true,
    stock_quantity INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    size TEXT NOT NULL,
    color TEXT NOT NULL,
    stock_quantity INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.product_attributes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    attribute_name TEXT NOT NULL,
    attribute_value TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Wishlist table
CREATE TABLE public.wishlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);

-- 3. INDEXES
CREATE INDEX idx_products_gender ON public.products(gender);
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_brand ON public.products(brand);
CREATE INDEX idx_products_tag ON public.products(tag);
CREATE INDEX idx_products_active ON public.products(is_active);
CREATE INDEX idx_product_images_product_id ON public.product_images(product_id);
CREATE INDEX idx_product_variants_product_id ON public.product_variants(product_id);
CREATE INDEX idx_product_attributes_product_id ON public.product_attributes(product_id);
CREATE INDEX idx_wishlists_user_id ON public.wishlists(user_id);
CREATE INDEX idx_wishlists_product_id ON public.wishlists(product_id);

-- 4. RLS SETUP
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_attributes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;

-- 5. RLS POLICIES

-- Products - Public read access
CREATE POLICY "public_can_read_products"
ON public.products
FOR SELECT
TO public
USING (is_active = true);

-- Product images - Public read access
CREATE POLICY "public_can_read_product_images"
ON public.product_images
FOR SELECT
TO public
USING (true);

-- Product variants - Public read access
CREATE POLICY "public_can_read_product_variants"
ON public.product_variants
FOR SELECT
TO public
USING (true);

-- Product attributes - Public read access
CREATE POLICY "public_can_read_product_attributes"
ON public.product_attributes
FOR SELECT
TO public
USING (true);

-- Wishlists - Users manage their own wishlists
CREATE POLICY "users_manage_own_wishlists"
ON public.wishlists
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 6. FUNCTIONS
CREATE OR REPLACE FUNCTION public.handle_product_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- 7. TRIGGERS
CREATE TRIGGER set_product_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.handle_product_updated_at();

-- 8. MOCK DATA
DO $$
DECLARE
    -- Women Products
    women_prod1_id UUID := gen_random_uuid();
    women_prod2_id UUID := gen_random_uuid();
    women_prod3_id UUID := gen_random_uuid();
    women_prod4_id UUID := gen_random_uuid();
    women_prod5_id UUID := gen_random_uuid();
    women_prod6_id UUID := gen_random_uuid();
    
    -- Men Products
    men_prod1_id UUID := gen_random_uuid();
    men_prod2_id UUID := gen_random_uuid();
    men_prod3_id UUID := gen_random_uuid();
    men_prod4_id UUID := gen_random_uuid();
    men_prod5_id UUID := gen_random_uuid();
    men_prod6_id UUID := gen_random_uuid();
    
    -- Compression Products
    comp_prod1_id UUID := gen_random_uuid();
    comp_prod2_id UUID := gen_random_uuid();
    comp_prod3_id UUID := gen_random_uuid();
    comp_prod4_id UUID := gen_random_uuid();
BEGIN
    -- Insert Women Products
    INSERT INTO public.products (id, name, description, price, original_price, gender, category, brand, rating, review_count, tag, stock_quantity)
    VALUES
        (women_prod1_id, 'Women Power Flex Leggings', 'High-performance compression leggings for maximum support and comfort during intense workouts', 2199, 2999, 'women', 'joggers', 'PowerFlex', 4.9, 412, 'SALE', 150),
        (women_prod2_id, 'Women Crop Training Top', 'Breathable crop top with moisture-wicking technology for optimal performance', 1499, NULL, 'women', 'tshirts', 'ActiveWear', 4.5, 203, 'HOT', 200),
        (women_prod3_id, 'Women Sports Bra', 'Maximum support sports bra designed for high-impact activities', 1899, NULL, 'women', 'tshirts', 'EliteFit', 4.9, 521, 'BESTSELLER', 180),
        (women_prod4_id, 'Women Training Shorts', 'Lightweight training shorts with side mesh panels for enhanced breathability', 1599, NULL, 'women', 'shorts', 'FlexZone', 4.7, 245, 'TRENDING', 220),
        (women_prod5_id, 'Women Seamless Leggings', 'Ultra-comfortable seamless leggings for yoga and fitness activities', 2399, NULL, 'women', 'joggers', 'SeamlessPro', 4.8, 378, 'BESTSELLER', 130),
        (women_prod6_id, 'Women Zip-Up Hoodie', 'Premium athletic hoodie with thumb holes and moisture management', 3499, 4299, 'women', 'hoodies', 'ComfortZone', 4.7, 223, 'SALE', 95);

    -- Insert Men Products
    INSERT INTO public.products (id, name, description, price, original_price, gender, category, brand, rating, review_count, tag, stock_quantity)
    VALUES
        (men_prod1_id, 'Elite Performance Compression Tee', 'Advanced compression technology for muscle support and faster recovery', 2499, 3499, 'men', 'tshirts', 'ElitePro', 4.8, 234, 'BESTSELLER', 175),
        (men_prod2_id, 'Pro Training Shorts', 'Durable training shorts with multiple pockets and quick-dry fabric', 1799, NULL, 'men', 'shorts', 'ProGear', 4.6, 189, 'NEW', 210),
        (men_prod3_id, 'Muscle Fit Hoodie', 'Athletic fit hoodie designed for maximum mobility and style', 3299, NULL, 'men', 'hoodies', 'MuscleWear', 4.7, 156, 'TRENDING', 120),
        (men_prod4_id, 'Performance Joggers', 'Premium joggers with tapered fit and multiple storage options', 2799, 3299, 'men', 'joggers', 'FlexFit', 4.8, 287, 'BESTSELLER', 140),
        (men_prod5_id, 'Muscle Tank Top', 'Classic muscle fit tank with dropped armholes for freedom of movement', 1299, 1799, 'men', 'tshirts', 'IronCore', 4.6, 167, 'SALE', 230),
        (men_prod6_id, 'Men Training Tee', 'Breathable training t-shirt with anti-odor technology', 1699, NULL, 'men', 'tshirts', 'FreshWear', 4.6, 198, 'TRENDING', 190);

    -- Insert Compression Products
    INSERT INTO public.products (id, name, description, price, original_price, gender, category, brand, rating, review_count, tag, stock_quantity)
    VALUES
        (comp_prod1_id, 'Compression Full Suit', 'Full body compression suit for maximum muscle support and recovery', 4999, NULL, 'compression', 'compression_wear', 'CompressMax', 4.9, 89, 'HOT', 75),
        (comp_prod2_id, 'Compression Arm Sleeves', 'Professional-grade arm sleeves for enhanced circulation and support', 899, NULL, 'compression', 'accessories', 'ArmPro', 4.4, 98, 'NEW', 300),
        (comp_prod3_id, 'Compression Calf Sleeves', 'Advanced compression for improved blood flow and reduced muscle fatigue', 999, NULL, 'compression', 'accessories', 'LegSupport', 4.6, 145, 'TRENDING', 250),
        (comp_prod4_id, 'Full Length Compression Tights', 'Medical-grade compression for optimal performance and recovery', 3499, NULL, 'compression', 'compression_wear', 'ProRecovery', 4.8, 201, 'PRO', 110);

    -- Insert Product Images for Women Products
    INSERT INTO public.product_images (product_id, image_url, alt_text, is_primary, display_order)
    VALUES
        (women_prod1_id, 'https://images.unsplash.com/photo-1665997960533-702b61ba2f1c', 'Woman in black compression leggings performing yoga pose outdoors', true, 1),
        (women_prod2_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_13a134b0d-1764871013809.png', 'Athletic woman wearing white crop training top in gym setting', true, 1),
        (women_prod3_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_16dc13c0a-1765976900735.png', 'Woman wearing black high-support sports bra during training', true, 1),
        (women_prod4_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_14d865962-1764906559127.png', 'Woman in black athletic shorts with side mesh panels', true, 1),
        (women_prod5_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_1cefb44a0-1765410838257.png', 'Woman wearing seamless gray leggings in stretching pose', true, 1),
        (women_prod6_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_11fa76d8c-1765314260793.png', 'Woman in gray zip-up athletic hoodie with thumb holes', true, 1);

    -- Insert Product Images for Men Products
    INSERT INTO public.product_images (product_id, image_url, alt_text, is_primary, display_order)
    VALUES
        (men_prod1_id, 'https://images.unsplash.com/photo-1620145225202-c3a411a5f0a7', 'Athletic man wearing black compression t-shirt with orange accents during workout', true, 1),
        (men_prod2_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_141043265-1765255836176.png', 'Black athletic training shorts with side pockets on white background', true, 1),
        (men_prod3_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_1fb5a4c6d-1765030554074.png', 'Gray athletic hoodie with modern fit on mannequin', true, 1),
        (men_prod4_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_13eaabeab-1764664782994.png', 'Black tapered joggers with elastic cuffs and side pockets', true, 1),
        (men_prod5_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_1ccf7dc2e-1765167059071.png', 'Gray muscle fit tank top with dropped armholes on model', true, 1),
        (men_prod6_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_1fb7d86bc-1766124324867.png', 'Man wearing white breathable training t-shirt in gym', true, 1);

    -- Insert Product Images for Compression Products
    INSERT INTO public.product_images (product_id, image_url, alt_text, is_primary, display_order)
    VALUES
        (comp_prod1_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_136d697e8-1765215462276.png', 'Full body black compression suit with orange accent lines', true, 1),
        (comp_prod2_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_136d697e8-1765215462276.png', 'Pair of black compression arm sleeves with orange trim', true, 1),
        (comp_prod3_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_136d697e8-1765215462276.png', 'Black compression calf sleeves with gradient design', true, 1),
        (comp_prod4_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_136d697e8-1765215462276.png', 'Full length compression tights in black with mesh panels', true, 1);

    -- Insert Product Variants (Sizes and Colors)
    -- Women Products Variants
    INSERT INTO public.product_variants (product_id, size, color, stock_quantity)
    VALUES
        (women_prod1_id, 'S', 'Black', 40),
        (women_prod1_id, 'M', 'Black', 50),
        (women_prod1_id, 'L', 'Black', 35),
        (women_prod1_id, 'XL', 'Black', 25),
        (women_prod2_id, 'S', 'White', 55),
        (women_prod2_id, 'M', 'White', 70),
        (women_prod2_id, 'L', 'White', 45),
        (women_prod2_id, 'S', 'Pink', 30);

    -- Men Products Variants
    INSERT INTO public.product_variants (product_id, size, color, stock_quantity)
    VALUES
        (men_prod1_id, 'M', 'Black', 45),
        (men_prod1_id, 'L', 'Black', 60),
        (men_prod1_id, 'XL', 'Black', 40),
        (men_prod1_id, 'XXL', 'Black', 30),
        (men_prod2_id, 'M', 'Navy', 55),
        (men_prod2_id, 'L', 'Navy', 70),
        (men_prod2_id, 'XL', 'Navy', 50),
        (men_prod2_id, 'M', 'Gray', 35);

    -- Compression Products Variants
    INSERT INTO public.product_variants (product_id, size, color, stock_quantity)
    VALUES
        (comp_prod1_id, 'M', 'Black', 20),
        (comp_prod1_id, 'L', 'Black', 30),
        (comp_prod1_id, 'XL', 'Black', 25),
        (comp_prod2_id, 'M', 'Black', 80),
        (comp_prod2_id, 'L', 'Black', 120),
        (comp_prod2_id, 'XL', 'Black', 100);

    -- Insert Product Attributes
    INSERT INTO public.product_attributes (product_id, attribute_name, attribute_value)
    VALUES
        (women_prod1_id, 'Material', 'Nylon Spandex Blend'),
        (women_prod1_id, 'Compression Level', 'Medium'),
        (women_prod1_id, 'Occasion', 'Gym, Yoga, Running'),
        (women_prod3_id, 'Material', 'Performance Mesh'),
        (women_prod3_id, 'Support Level', 'High Impact'),
        (men_prod1_id, 'Material', 'Compression Fabric'),
        (men_prod1_id, 'Compression Level', 'Firm'),
        (men_prod4_id, 'Material', 'Cotton Polyester'),
        (men_prod4_id, 'Fit Type', 'Tapered'),
        (comp_prod1_id, 'Compression Level', 'Firm'),
        (comp_prod1_id, 'Material', 'Medical Grade Compression'),
        (comp_prod1_id, 'Sport Application', 'Recovery, Training');
END $$;