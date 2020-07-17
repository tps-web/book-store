import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import store from '@/store'
Vue.use(Router)

const router = new Router({
    // 解决路由跳转页面没有置顶
    scrollBehavior(to, from, savedPosition) {
        // console.log(savedPosition)
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    },
    routes: [{
            path: '/',
            name: 'home',
            component: () =>
                import ('@/pages/home/index'),
            meta: {
                title: "首页"
            }
        },
        {
            path: '/me',
            name: 'me',
            component: () =>
                import ('@/pages/me/index'),
            meta: {
                title: "我的"
            }
        },
        {
            path: '/cart',
            name: 'cart',
            component: () =>
                import ('@/pages/cart/index'),
            meta: {
                title: "购物车"
            }
        },
        {
            path: '/address',
            name: 'address',
            component: () =>
                import ('@/pages/me/address/list'),
            meta: {
                title: "地址"
            }
        },
        {
            path: '/edit',
            name: 'edit',
            component: () =>
                import ('@/pages/me/address/edit'),
            meta: {
                title: "编辑地址"
            }
        },
        {
            path: '/help',
            name: 'help',
            component: () =>
                import ('@/pages/me/help/index'),
            meta: {
                title: "帮助中心"
            }
        },
        {
            path: '/coupon',
            name: 'coupon',
            component: () =>
                import ('@/pages/me/coupon/index'),
            meta: {
                title: "优惠券"
            }
        },
        {
            path: '/convert',
            name: 'convert',
            component: () =>
                import ('@/pages/me/convert/index'),
            meta: {
                title: "兑换中心"
            }
        },
        {
            path: '/category',
            name: 'category',
            component: () =>
                import ('@/pages/category/index'),
            meta: {
                title: "分类"
            }

        },
        {
            path: '/search',
            name: 'search',
            component: () =>
                import ('@/pages/search/index'),
            meta: {
                title: "搜索"
            }
        },
        {
            path: '/move',
            name: 'move',
            component: () =>
                import ('@/pages/move/index'),
            meta: {
                title: "更多"
            }
        },
        {
            path: '/goodsDetails',
            name: 'goodsDetails',
            component: () =>
                import ('@/pages/goodsDetails/index'),
            meta: {
                title: "绘本详情"
            }
        },
        {
            path: `/bugAndRent/:path/:pathChildren`,
            name: '/bugAndRent/:path/:pathChildren',
            component: () =>
                import ('@/pages/bugAndRent/index'),
            meta: {
                title: "订单"
            }
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
                import ('@/pages/order/index'),
            meta: {
                title: "订单"
            }
        },
        {
            path: '/addAddress',
            name: 'addAddress',
            component: () =>
                import ('@/pages/order/address/add.vue'),
            meta: {
                title: "添加地址"
            }
        },
        {
            path: '/orderDetails',
            name: 'orderDetails',
            component: () =>
                import ('@/pages/orderDetails/orderDetails.vue'),
            meta: {
                title: "订单详情"
            }
        },
        //租书订单
        {
            path: '/rentOrder',
            name: 'rentOrder',
            component: () =>
                import ('@/pages/rentOrder/rentOrder.vue'),
            meta: {
                title: "订单详情"
            }
        },


    ]
})
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (!store.state.userInfo) {
        store.dispatch('getUserInfo')
    }
    next()
})

export default router