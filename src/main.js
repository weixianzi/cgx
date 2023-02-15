import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from '@/router/routerGuard.js'
import "@/golobal/icon.less"
import eventBus from 'vue3-eventbus'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'nprogress/nprogress.css'

let pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.use(eventBus)

app.mount('#app')
