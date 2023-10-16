import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/styles/main.scss'
import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App);

app
    .use(router)
    .use(createPinia())
    .use(vuetify)
    .mount('#app')
