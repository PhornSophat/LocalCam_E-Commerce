/**
 * PROFILES TABLE - ADMIN ACCESS SETUP
 * This script allows admin users to view all profiles
 * 
 * INSTRUCTIONS:
 * 1. Go to Supabase Dashboard → SQL Editor
 * 2. Copy entire SQL below
 * 3. Paste and Run
 */

-- =====================
-- DROP EXISTING ADMIN POLICIES (if any)
-- =====================
DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;

-- =====================
-- CREATE ADMIN READ POLICY
-- =====================

-- Policy: Admins can read all profiles
CREATE POLICY "Admins can read all profiles"
  ON profiles FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'admin'
    )
  );

-- =====================
-- ALTERNATIVE: Service Role Access (Recommended)
-- =====================
-- If you're using service_role key in your admin API calls, 
-- the service role bypasses RLS automatically.
-- No additional policy needed in that case.

-- =====================
-- VERIFY POLICIES
-- =====================
-- Run this query to verify policies are set:
-- SELECT schemaname, tablename, policyname, roles, cmd, qual 
-- FROM pg_policies 
-- WHERE tablename = 'profiles';
