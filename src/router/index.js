import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const router = new Router({
        routes: [{
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
                path: '/help',
                name: 'help',
                component: () =>
                    import ('@/pages/me/help/index'),
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
            },
            {
                path: '/move',
                name: 'move',
                component: () =>
                    import ('@/pages/move/index'),
            },
            {
                path: '/goodsDetails',
                name: 'goodsDetails',
                component: () =>
                    import ('@/pages/goodsDetails/index'),
            },
            {
                path: `/bugAndRent/:path/:pathChildren`,
                name: '/bugAndRent/:path/:pathChildren',
                component: () =>
                    import ('@/pages/bugAndRent/index'),
            },
            {
                path: '/vip',
                name: 'vip',
                component: () =>
                    import ('@/pages/me/vip/index'),
            },
            {
                path: '/order',
                name: 'order',
                component: () =>
                    import ('@/pages/order/index')
            },
            {
                path: '/addAddress',
                name: 'addAddress',
                component: () =>
                    import ('@/pages/order/address/add.vue'),
            },


        ]
    })
    // router.beforeEach((to,from,next)=>{
    // console.log(to)
    // console.log(from)
    // console.log(window.history.length) 
    // next()
    // })

export default router