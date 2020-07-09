import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const router=new Router({
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
    },
    {
      path: '/wallet',
      name: 'wallet',
       component: () =>
            import ('@/pages/me/wallet/index'),
    },
    {
      path: '/coupon',
      name: 'coupon',
       component: () =>
            import ('@/pages/me/coupon/index'),
    },
    {
      path: '/convert',
      name: 'convert',
       component: () =>
            import ('@/pages/me/convert/index'),
    },
    {
      path: '/category',
      name: 'category',
       component: () =>
            import ('@/pages/category/index'),
    },
    {
      path: '/search',
      name: 'search',
       component: () =>
            import ('@/pages/search/index'),
    }
  ]
})
router.beforeEach((to,from,next)=>{
  // console.log(to)
  // console.log(from)
  // console.log(window.history.length)
  next()
})

export default  router

