//import บางส่วนจากlibrary หรือ ไฟล์
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

//import ชื่อตัวแปร เราตั้งเอง
import App from './App.vue'
import router from './router' //หาไฟล์index.js ในdirของrouter

// import './assets/main.css'
import './assets/index.css'
import 'flowbite';

const app = createApp(App)

//กำหนดตัวแปรglobal
const axiosInstance = axios.create({
    baseURL: 'http://localhost/api'
})

app.config.globalProperties.$axios = { ...axiosInstance} //copy จากobjเดิม ไปสร้าง objใหม่

app.use(createPinia())
app.use(router)

app.mount('#app')
