// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入mint-ui
import Mint from 'mint-ui'

Vue.use(Mint)
import 'mint-ui/lib/style.css'
import './assets/css/common.css'
import './assets/icon/iconfont.css'
//微信titile
Vue.use(require('vue-wechat-title'))
Vue.config.productionTip = false
//登录验证
router.beforeEach((to, form, next) => {
  if (to.path === '/login') {
    next()
  } else {
    if (to.meta.requireAuth && !localStorage.getItem('accessToken')) {
      next({path: '/login'})
    } else {
      next()
    }
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
