-- Drop unwanted columns from public.profiles safely
-- Run this in Supabase SQL editor or psql. All drops use IF EXISTS.

ALTER TABLE public.profiles
  DROP COLUMN IF EXISTS seller_badge,
  DROP COLUMN IF EXISTS shop_description,
  DROP COLUMN IF EXISTS shop_name,
  DROP COLUMN IF EXISTS two_factor_enabled,
  DROP COLUMN IF EXISTS two_factor_secret,
  DROP COLUMN IF EXISTS average_rating,
  DROP COLUMN IF EXISTS sms_notification,
  DROP COLUMN IF EXISTS sms_opt_in,
  DROP COLUMN IF EXISTS newsletter,
  DROP COLUMN IF EXISTS newsletter_opt_in,
  DROP COLUMN IF EXISTS timezone,
  DROP COLUMN IF EXISTS verified_badge,
  DROP COLUMN IF EXISTS profile_completed,
  DROP COLUMN IF EXISTS middle_name,
  DROP COLUMN IF EXISTS postal_code,
  DROP COLUMN IF EXISTS phone_verified;