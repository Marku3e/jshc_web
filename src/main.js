// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


//引入swiper
import vueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(vueAwesomeSwiper)
//引入axios
import axios from 'axios'

Vue.prototype.$axios = axios

//引入mint-ui
import Mint from 'mint-ui'

Vue.use(Mint)
// import 'mint-ui/lib/style.css'
import './assets/css/mint.css'
//通用css
import './assets/css/common.css'
//通用js
import common from './assets/js/common'
//绑定到Vue的原型上
Vue.prototype.$com = common
//iconfont
import './assets/icon/iconfont.css'
//微信titile
Vue.use(require('vue-wechat-title'))
Vue.config.productionTip = false
//登录验证
router.beforeEach((to, form, next) => {
  if (to.path === '/login') {
    next()
  } else {
    if (to.meta.requireAuth && !localStorage.getItem('jshc_token')) {
      next({path: '/login'})
    }  else {
      next()
    }
  }
})

import store from './store'
/* eslint-disable no-new */
let realVue = new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
export default {
  vue: realVue
}
