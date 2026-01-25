/**
 * QUICK FIX - Remove Infinite Recursion Policy
 * Run this FIRST to stop the 500 error
 */

-- Drop the problematic policy causing infinite recursion
DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;

-- Temporary solution: Just use the existing policies
-- Users can read their own profile, service role can read all
-- This allows the app to work while we implement a proper admin policy

-- Verify the policy is gone
SELECT policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'profiles';
