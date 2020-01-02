import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible' // 移动端自适应
import api from '@/api' // api
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.api = api
Vue.prototype.axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
