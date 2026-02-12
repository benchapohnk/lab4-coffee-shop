import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import './style.css'

// 1. นำเข้าไฟล์ CoffeeHeader ให้ถูกต้อง
import CoffeeHeader from './components/CoffeeHeader.vue' 

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

// 2. ลงทะเบียน Component ชื่อ 'coffee-header'
app.component('coffee-header', CoffeeHeader) 

app.mount('#app')