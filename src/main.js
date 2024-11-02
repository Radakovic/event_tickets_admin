/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import axios from 'axios'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')

axios.defaults.baseURL = 'http://localhost:8084/api';
axios.defaults.headers.common['Content-Type'] = 'application/ld+json';
axios.defaults.headers.common['Accept'] = 'application/ld+json';
