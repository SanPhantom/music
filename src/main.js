import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import MuseUI from 'muse-ui'
import MuseUIToast from "muse-ui-toast"
import 'muse-ui/dist/muse-ui.css'
import axios from 'axios'
import utils from './assets/utils'
import musicService from './assets/music_service.js'
import lyricService from './assets/lyric_service.js'

Vue.config.productionTip = false

Vue.use(MuseUI)
Vue.use(MuseUIToast)

axios.defaults.baseURL = 'http://www.sanphantom.cn:3000'
    // axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.prototype.$axios = axios
Vue.prototype.$utils = utils
Vue.prototype.$music = musicService
Vue.prototype.$lyric = lyricService

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

(function() {
    var rem = document.createElement('script')
    rem.src = './rem.js'
    document.body.appendChild(rem)
})()
