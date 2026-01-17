import { createClient } from '@supabase/supabase-js'

// 1. Get these from your Supabase Dashboard (Settings -> API)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY  

// 2. We add "export" so ShopPage.vue can import it
export const supabase = createClient(supabaseUrl, supabaseAnonKey)