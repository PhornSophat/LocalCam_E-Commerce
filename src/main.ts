import './assets/main.css' // CSS import
import { createApp } from 'vue' // Vue 3 import
import App from './App.vue' // Main App component
import router from './router' // Router configuration
import { supabase } from './supabase'
import { ensureProfileForCurrentSession } from './lib/profileSync'

const app = createApp(App) // Create Vue app instance

app.use(router) // Use vuw Router

app.mount('#app') // Mount to DOM

// Ensure a profile exists for the logged-in user (non-blocking, after mount)
// Defer to next tick so DOM is ready for toast notifications
setTimeout(() => {
  ensureProfileForCurrentSession().catch(() => {})
}, 0)

// NOTE: Disabled auth state change listener to avoid redundant profile checks during login
// The database trigger 'on_auth_user_created' now handles profile creation automatically
// If you need to re-enable this, make sure to debounce it properly
// supabase.auth.onAuthStateChange(async () => {
//   await ensureProfileForCurrentSession().catch(() => {})
// })
