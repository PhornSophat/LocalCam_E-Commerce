import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Deleted the unused 'import { supabase } ...' line here

const app = createApp(App)

app.use(router)

app.mount('#app')
