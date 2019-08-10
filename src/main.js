import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import axios from 'axios'
import utils from './assets/utils'

Vue.config.productionTip = false

Vue.use(MuseUI)

axios.defaults.baseURL = 'http://www.sanphantom.cn:3000'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.prototype.$axios = axios
Vue.prototype.$utils = utils

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

(function () {
  var rem = document.createElement('script')
  rem.src = './rem.js'
  document.body.appendChild(rem)
})()
