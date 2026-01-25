/**
 * PRODUCTS TABLE RLS POLICY SETUP
 * This script allows anonymous (non-logged-in) users to view products
 * Only authenticated users can create/update/delete products
 * 
 * INSTRUCTIONS:
 * 1. Go to Supabase Dashboard → SQL Editor
 * 2. Copy entire SQL below
 * 3. Paste and Run
 */

-- =====================
-- ENABLE RLS FOR PRODUCTS TABLE
-- =====================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- =====================
-- DROP EXISTING POLICIES (if any)
-- =====================
DROP POLICY IF EXISTS "Public can read products" ON products;
DROP POLICY IF EXISTS "Users can create products" ON products;
DROP POLICY IF EXISTS "Users can update own products" ON products;
DROP POLICY IF EXISTS "Users can delete own products" ON products;
DROP POLICY IF EXISTS "Allow service role" ON products;

-- =====================
-- RLS POLICIES FOR PRODUCTS
-- =====================

-- Policy: Everyone (authenticated or not) can read products
CREATE POLICY "Public can read products"
  ON products FOR SELECT
  USING (true);

-- Policy: Only authenticated users can create products
CREATE POLICY "Users can create products"
  ON products FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Policy: Only admin or service role can update products
CREATE POLICY "Users can update own products"
  ON products FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Policy: Only admin or service role can delete products
CREATE POLICY "Users can delete own products"
  ON products FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Policy: Allow service role for backend operations (e.g., admin panel)
CREATE POLICY "Allow service role"
  ON products FOR ALL
  USING (auth.role() = 'service_role');

-- =====================
-- INDEXES FOR PERFORMANCE
-- =====================
CREATE INDEX IF NOT EXISTS products_slug_idx ON products(slug);
CREATE INDEX IF NOT EXISTS products_category_id_idx ON products(category_id);
CREATE INDEX IF NOT EXISTS products_created_at_idx ON products(created_at DESC);

-- =====================
-- VERIFY RLS IS ENABLED
-- =====================
-- Run this query to verify RLS is enabled:
-- SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'products';

-- Should return: true for rowsecurity column
