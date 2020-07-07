import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
       component: () =>
            import ('@/pages/home/index'),
    },
    {
      path: '/me',
      name: 'me',
       component: () =>
            import ('@/pages/me/index'),
    },
    {
      path: '/cart',
      name: 'cart',
       component: () =>
            import ('@/pages/cart/index'),
    },
    {
      path: '/address',
      name: 'address',
       component: () =>
            import ('@/pages/me/address/list'),
    },
    {
      path: '/edit',
      name: 'edit',
       component: () =>
            import ('@/pages/me/address/edit'),
    }
    
  ]
})
