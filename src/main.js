import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/styles/main.scss'
import App from './App.vue'
import router from './router'

const app = createApp(App);

app
    .use(router)
    .use(createPinia())
    .mount('#app')
