import { createApp } from 'vue'
import router from './router';
import ElementPlus from 'element-plus'
import UedPlus from 'ued-plus'
import 'element-plus/theme-chalk/index.css'
import './style.css'
import App from './App.vue'

createApp(App)
  .use(ElementPlus)
  .use(UedPlus)
  .use(router)
  .mount('#app')
