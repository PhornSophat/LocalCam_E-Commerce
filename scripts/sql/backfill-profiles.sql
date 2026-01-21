-- Backfill profiles for existing auth users
-- Run this in Supabase SQL Editor after setting up the profiles table/trigger

INSERT INTO public.profiles (id, email, role, created_at, updated_at)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'role', 'user'),
  au.created_at,
  NOW()
FROM auth.users au
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles p WHERE p.id = au.id
)
ON CONFLICT (id) DO NOTHING;
