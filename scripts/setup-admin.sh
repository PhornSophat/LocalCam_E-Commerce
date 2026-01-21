#!/bin/bash
# This script helps set up the profiles table in Supabase
# Instructions: 
# 1. Go to your Supabase Dashboard (https://app.supabase.com/)
# 2. Select your project
# 3. Go to SQL Editor
# 4. Copy the SQL from below and paste it into the SQL Editor
# 5. Click "Run"

echo "===== SUPABASE PROFILES TABLE SETUP ====="
echo ""
echo "Copy the SQL below and run it in your Supabase Dashboard SQL Editor:"
echo "https://app.supabase.com/ → Select Project → SQL Editor"
echo ""
echo "========================================"
echo ""

cat << 'EOF'
-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Allow service role" ON profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;

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

-- Create an index for faster queries
CREATE INDEX IF NOT EXISTS profiles_email_idx ON profiles(email);
CREATE INDEX IF NOT EXISTS profiles_role_idx ON profiles(role);

-- Function to create a profile trigger on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'user')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile when new user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- After running the above, manually set your admin user role:
-- UPDATE profiles SET role = 'admin' WHERE email = 'your-admin-email@example.com';
EOF

echo ""
echo "========================================"
echo "NEXT STEPS:"
echo "1. Copy the SQL above"
echo "2. Go to Supabase Dashboard → SQL Editor"
echo "3. Paste and run the SQL"
echo "4. Then run: UPDATE profiles SET role = 'admin' WHERE email = 'your-admin-email@example.com';"
echo "5. Test login again"
echo "========================================"
