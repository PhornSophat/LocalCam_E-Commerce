-- Auto-create profile when a new user signs up in auth.users
-- Run this in Supabase SQL Editor to sync auth.users with profiles table

-- First, ensure required columns exist
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW();

-- Create the trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    TRIM(COALESCE(NEW.raw_user_meta_data->>'first_name', '') || ' ' || COALESCE(NEW.raw_user_meta_data->>'last_name', '')),
    COALESCE(NEW.raw_user_meta_data->>'role', 'user'),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Optional: Sync existing auth.users to profiles (run once)
-- This will create profile rows for any auth users that don't have profiles yet
INSERT INTO public.profiles (id, email, full_name, role, created_at, updated_at)
SELECT 
  au.id,
  au.email,
  TRIM(COALESCE(au.raw_user_meta_data->>'first_name', '') || ' ' || COALESCE(au.raw_user_meta_data->>'last_name', '')),
  COALESCE(au.raw_user_meta_data->>'role', 'user'),
  au.created_at,
  NOW()
FROM auth.users au
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles p WHERE p.id = au.id
)
ON CONFLICT (id) DO NOTHING;
