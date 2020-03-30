import Vue from 'vue'
import App from './App.vue'

import router from './router/router'
import '@/assets/css/reset.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import Alert from '@/components/Alert/alert.js'
Vue.use(Alert)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
