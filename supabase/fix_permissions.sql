
-- 🚨 URGENT: RUN THIS IN SUPABASE SQL EDITOR 🚨
-- The system is currently ignoring Admin Updates because "Row Level Security" is ON
-- but no policies were created to allow 'Updates'.

-- 1. Enable Inserts (creating migrated products)
CREATE POLICY "Enable insert for authenticated users only" ON "public"."products"
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (true);

-- 2. Enable Updates (changing prices/stock)
CREATE POLICY "Enable update for authenticated users only" ON "public"."products"
AS PERMISSIVE FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- 3. Enable Deletes (removing products)
CREATE POLICY "Enable delete for authenticated users only" ON "public"."products"
AS PERMISSIVE FOR DELETE
TO authenticated
USING (true);

-- 4. Repeat for Product Images
CREATE POLICY "Enable images insert" ON "public"."product_images" FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable images update" ON "public"."product_images" FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Enable images delete" ON "public"."product_images" FOR DELETE TO authenticated USING (true);

-- 5. Repeat for Variants
CREATE POLICY "Enable variants all" ON "public"."product_variants" FOR ALL TO authenticated USING (true);

-- 6. Repeat for Attributes
CREATE POLICY "Enable attributes all" ON "public"."product_attributes" FOR ALL TO authenticated USING (true);
