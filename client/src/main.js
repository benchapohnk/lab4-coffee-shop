import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import './style.css'

// นำเข้า CkeditorPlugin (สังเกตชื่อตัวแปร)
import { CkeditorPlugin } from '@ckeditor/ckeditor5-vue' 

import CoffeeHeader from './components/CoffeeHeader.vue' 

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

// เรียกใช้งาน Plugin ด้วยชื่อที่ถูกต้อง
app.use(CkeditorPlugin) 

app.component('coffee-header', CoffeeHeader) 
app.mount('#app')