import { supabase } from '../supabase'
import { toast } from '../utils/toast'

// Ensures the current session user has a row in `profiles`.
// If missing, attempts a client-side insert as a fallback.
// If RLS prevents insert, shows a warning pointing to the SQL trigger setup.
export async function ensureProfileForCurrentSession() {
  // Quick check: use local storage to debounce repeated calls
  // Only fetch from Supabase if we haven't checked recently
  const storageKey = 'profile_check_time'
  const lastCheck = localStorage.getItem(storageKey)
  const now = Date.now()

  // Skip if we checked in the last 30 seconds
  if (lastCheck && now - parseInt(lastCheck) < 30000) {
    return null
  }

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const user = session?.user
  if (!user) {
    // No user logged in; skip all checks and return quickly
    localStorage.setItem(storageKey, now.toString())
    return null
  }

  try {
    // Check if a profile exists
    const { data: existing, error: fetchError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single()

    if (existing && !fetchError) {
      localStorage.setItem(storageKey, now.toString())
      return existing
    }
  } catch (e) {
    // If selecting profiles is blocked entirely, just return silently
    return null
  }

  // Try to create a minimal profile row client-side (may be blocked by RLS)
  try {
    const { data: inserted, error: insertError } = await supabase
      .from('profiles')
      .insert([
        {
          id: user.id,
          email: user.email,
          role: 'user',
        },
      ])
      .select()
      .single()

    if (insertError) {
      // Most likely RLS/permission error: surface a helpful warning
      console.warn(
        'Profile insert failed (likely RLS). Consider enabling the trigger.',
        insertError,
      )
      // Only show toast if DOM is ready
      if (typeof window !== 'undefined' && document.readyState === 'complete') {
        toast.warning(
          'Profile not auto-created. Run SQL in scripts/sql/setup-profiles-trigger.sql to enable auto-create and backfill.',
          6000,
        )
      }
      localStorage.setItem(storageKey, now.toString())
      return null
    }

    // Only show success toast if DOM is ready
    if (typeof window !== 'undefined' && document.readyState === 'complete') {
      toast.success('Your profile has been initialized.')
    }
    localStorage.setItem(storageKey, now.toString())
    return inserted
  } catch (e) {
    // Any unexpected error; warn quietly so UX isn’t blocked
    console.warn('ensureProfileForCurrentSession unexpected error:', e)
    return null
  }
}
