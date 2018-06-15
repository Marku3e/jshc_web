import Vue from 'vue'
import Router from 'vue-router'
// import home from '@/components/home/home'
// import login from '@/components/login/login'


Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [{
    path: '/',
    name: 'home',
    component: resolve => require(['@/components/home/home'], resolve),
    title: '好提车',
    // meta: {requireAuth: true}
  }, {
    path: '/login',
    name: 'login',
    component: resolve => require(['@/components/login/login'], resolve),
    title: '好提车',
  },
  ]
})
