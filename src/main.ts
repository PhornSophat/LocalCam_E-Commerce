import './assets/main.css' // CSS import
import { createApp } from 'vue' // Vue 3 import
import App from './App.vue' // Main App component
import router from './router' // Router configuration

<<<<<<< HEAD
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
=======
const app = createApp(App) // Create Vue app instance
>>>>>>> origin/main

app.use(router) // Use vuw Router

app.mount('#app') // Mount to DOM
