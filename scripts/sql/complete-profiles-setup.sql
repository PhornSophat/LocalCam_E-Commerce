/**
 * COMPLETE PROFILES TABLE SETUP
 * Run this script to set up the profiles table with all necessary columns and policies
 * 
 * INSTRUCTIONS:
 * 1. Go to Supabase Dashboard → SQL Editor
 * 2. Copy ALL SQL below
 * 3. Paste and Run
 * 4. Replace 'your-email@example.com' with your actual admin email in the last line
 */

-- =====================
-- CREATE PROFILES TABLE
-- =====================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================
-- ENABLE ROW LEVEL SECURITY
-- =====================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- =====================
-- DROP EXISTING POLICIES
-- =====================
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Allow service role" ON profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;

-- =====================
-- CREATE RLS POLICIES
-- =====================

-- Policy: Users can view their own profile
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Policy: Allow service role for backend operations
CREATE POLICY "Allow service role"
  ON profiles FOR ALL
  USING (auth.role() = 'service_role');

-- Policy: Admins can read all profiles (using a helper function to avoid recursion)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT role = 'admin' 
    FROM profiles 
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

CREATE POLICY "Admins can read all profiles"
  ON profiles FOR SELECT
  USING (is_admin());

-- =====================
-- CREATE INDEXES
-- =====================
CREATE INDEX IF NOT EXISTS profiles_email_idx ON profiles(email);
CREATE INDEX IF NOT EXISTS profiles_role_idx ON profiles(role);

-- =====================
-- CREATE TRIGGER FUNCTION
-- =====================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'user')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================
-- CREATE TRIGGER
-- =====================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================
-- BACKFILL EXISTING USERS
-- =====================
-- Insert profiles for any existing auth.users that don't have a profile yet
INSERT INTO public.profiles (id, email, role, created_at)
SELECT 
  id, 
  email,
  'user',
  created_at
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles)
ON CONFLICT (id) DO NOTHING;

-- =====================
-- SET YOUR ADMIN USER
-- =====================
-- IMPORTANT: Replace 'your-email@example.com' with your actual email address
UPDATE profiles SET role = 'admin' WHERE email = 'your-email@example.com';

-- =====================
-- VERIFY SETUP
-- =====================
-- Check if your admin user exists
SELECT id, email, role FROM profiles WHERE role = 'admin';
