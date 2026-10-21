import { createApp } from 'vue'
import { createPinia } from 'pinia' // 1. 引入 pinia

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())  // 2. 挂载 pinia 到应用中
app.use(router)

app.mount('#app')
