//import บางส่วนจากlibrary หรือ ไฟล์
import { createApp } from 'vue'
import { createPinia } from 'pinia'

//import ชื่อตัวแปร เราตั้งเอง
import App from './App.vue'
import router from './router' //หาไฟล์index.js ในdirของrouter

// import './assets/main.css'
import './assets/index.css'
import 'flowbite';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
