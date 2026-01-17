/**
 * Admin Setup Helper
 * This file contains utilities to set up admin profiles and debug authentication issues
 */

import { supabase } from '../supabase'

/**
 * Ensure admin profile exists for current user
 * Call this after successful authentication
 */
export async function ensureAdminProfile(userId: string, email: string) {
  try {
    // Check if profile exists
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (!fetchError && profile) {
      console.log('Profile exists:', profile)
      return profile
    }

    // If not found, create it
    console.log('Profile not found, creating new profile...')
    const { data: newProfile, error: createError } = await supabase
      .from('profiles')
      .insert([
        {
          id: userId,
          email: email,
          role: 'user', // Default to user, admin must manually change in Supabase
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (createError) {
      console.error('Error creating profile:', createError)
      throw createError
    }

    console.log('Profile created successfully:', newProfile)
    return newProfile
  } catch (error) {
    console.error('Error in ensureAdminProfile:', error)
    throw error
  }
}

/**
 * Check if user is admin
 */
export async function isUserAdmin(userId: string): Promise<boolean> {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error checking admin status:', error)
      return false
    }

    return profile?.role === 'admin'
  } catch (error) {
    console.error('Error in isUserAdmin:', error)
    return false
  }
}

/**
 * Get user profile with error handling
 */
export async function getUserProfile(userId: string) {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error fetching user profile:', error)
      // Return default profile if not found
      return {
        id: userId,
        role: 'user',
        email: 'unknown@example.com',
        error: error.message,
      }
    }

    return profile
  } catch (error) {
    console.error('Error in getUserProfile:', error)
    throw error
  }
}

/**
 * Manual admin setup instruction
 * If tables don't exist, you need to run these SQL commands in Supabase:
 *
 * CREATE TABLE IF NOT EXISTS profiles (
 *   id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
 *   email TEXT UNIQUE NOT NULL,
 *   role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
 *   created_at TIMESTAMP DEFAULT NOW(),
 *   updated_at TIMESTAMP DEFAULT NOW()
 * );
 *
 * ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
 *
 * CREATE POLICY "Users can view their own profile"
 *   ON profiles FOR SELECT
 *   USING (auth.uid() = id);
 *
 * CREATE POLICY "Users can update their own profile"
 *   ON profiles FOR UPDATE
 *   USING (auth.uid() = id);
 *
 * CREATE POLICY "Allow admins to view all profiles"
 *   ON profiles FOR SELECT
 *   USING (
 *     (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
 *   );
 *
 * // After creating a user with email admin@example.com, run:
 * UPDATE profiles SET role = 'admin' WHERE email = 'admin@example.com';
 */
