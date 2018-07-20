import Vue from 'vue'
import Router from 'vue-router'
// import home from '@/components/home/home'
// import login from '@/components/login/login'


Vue.use(Router)

export default new Router({
  mode: "history",
  mode: "hash",
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
    {
      path: '/agreement',
      name: 'agreement',
      component: resolve => require(['@/components/user/agreement/agreement'], resolve),
      title: '用户协议',
    },
    {
      path: '/car/:type',
      name: 'car',
      component: resolve => require(['@/components/car/car'], resolve),
      title: '好提车',
    }, {
      path: '/demo',
      name: 'demo',
      component: resolve => require(['@/components/demo'], resolve),
      title: '好提车',
    }, {
      path: '/car/detail/:id',
      name: 'detail',
      component: resolve => require(['@/components/car/detail/'], resolve),
      title: '好提车',
    }, {
      path: '/user',
      name: 'center',
      component: resolve => require(['@/components/user/center'], resolve),
      meta: {requireAuth: true},
      title: '个人中心',
    }, {
      path: '/service',
      name: 'service',
      component: resolve => require(['@/components/home/service'], resolve),
      title: '服务保障',
    }, {
      path: '/store',
      name: 'store',
      component: resolve => require(['@/components/home/store'], resolve),
      title: '全国门店',
    }, {
      path: '/helpMe',
      name: 'helpMe',
      component: resolve => require(['@/components/home/helpMe'], resolve),
      title: '帮我选车',
    }, {
      path: '/user/order',
      name: 'order',
      component: resolve => require(['@/components/user/userOrder/order'], resolve),
      title: '我的订单',
    }, {
      path: '/user/order/info',
      name: 'orderInfo',
      component: resolve => require(['@/components/user/userOrder/orderInfo'], resolve),
      title: '订单详情',
    }, {
      path: '/user/collect',
      name: 'collect',
      component: resolve => require(['@/components/user/userCollect/collect'], resolve),
      title: '我的收藏',
    }, {
      path: '/user/audits',
      name: 'audits',
      component: resolve => require(['@/components/user/userAudits/audits'], resolve),
      title: '我的申请',
    }, {
      path: '/user/audits/info',
      name: 'auditsInfo',
      component: resolve => require(['@/components/user/userAudits/auditsInfo'], resolve),
      title: '申请详情',
    }, {
      path: '/car/buy',
      name: 'buy',
      component: resolve => require(['@/components/car/buy'], resolve),
      title: '我要提车',
    }, {
      path: '/car/appoint/:id',
      name: 'appoint',
      component: resolve => require(['@/components/car/appoint'], resolve),
      title: '预约到店',
    }, {
      path: '/search',
      name: 'search',
      component: resolve => require(['@/components/home/search'], resolve),
      title: '搜索',
    },
  ]
})
