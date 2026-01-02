import './assets/main.css' // CSS import
import { createApp } from 'vue' // Vue 3 import
import App from './App.vue' // Main App component
import router from './router' // Router configuration

const app = createApp(App) // Create Vue app instance

app.use(router) // Use vuw Router

app.mount('#app') // Mount to DOM
