import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
Vue.use(Router)
import { setToken, getToken } from '@/utils/authcookie'

const router = new Router({
    // 解决路由跳转页面没有置顶
    scrollBehavior(to, from, savedPosition) {
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
                title: "书架"
            }
        },
        {
            path: '/getUserInfo',
            name: 'me',
            component: () =>
                import ('@/components/getUserInfo'),
            meta: {
                title: "书架"
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
                title: "我的地址"
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
            path: '/edit/:id',
            name: 'editId',
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
            path: '/move/:id',
            name: 'move',
            component: () =>
                import ('@/pages/move/index'),
            meta: {
                title: "分类故事"
            }
        },
        {
            path: '/goodsDetails/:id',
            name: 'goodsDetails',
            component: () =>
                import ('@/pages/goodsDetails/index'),
            meta: {
                title: "绘本详情"
            }
        },
        {
            path: '/goodsDetails/:id/:searchHot',
            name: 'goodsDetails1',
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
            meta: {
                title: "会员中心"
            }
        },
        {
            path: '/zVip',
            name: 'zVip',
            component: () =>
                import ('@/pages/me/vip/zVip'),
            meta: {
                title: "会员中心"
            }
        },
        //购书
        {
            path: '/order',
            name: 'order',
            component: () =>
                import ('@/pages/order/index'),
            meta: {
                title: "提交订单"
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
            path: '/orderDetails/:id',
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
        {
            path: '/moveBookList',
            name: 'moveBookList',
            component: () =>
                import ('@/pages/moveBookList/index.vue'),
            meta: {
                title: "书单列表"
            }
        },
        {
            path: '/bookList/:id',
            name: 'bookList',
            component: () =>
                import ('@/pages/bookList/bookList.vue'),
            meta: {
                title: "书单详情"
            }
        },
        {
            path: '/success',
            name: 'success',
            component: () =>
                import ('@/pages/pay/success.vue'),
            meta: {
                title: "支付成功"
            }
        },
        {
            path: '/fail',
            name: 'fail',
            component: () =>
                import ('@/pages/pay/fail.vue'),
            meta: {
                title: "支付失败"
            }
        },
        {
            path: '/logistics/:id',
            name: 'logistics',
            component: () =>
                import ('@/pages/logistics/logistics.vue'),
            meta: {
                title: "物流信息"
            }
        },
        {
            path: '/weekBook',
            name: 'weekBook',
            component: () =>
                import ('@/pages/weekBook/weekBook.vue'),
            meta: {
                title: "本周新书"
            }
        },
        {
            path: '/comment/:id',
            name: 'comment',
            component: () =>
                import ('@/pages/comment/comment.vue'),
            meta: {
                title: "评论"
            }
        },
        {
            path: '/goodsList',
            name: 'goodsListDesc',
            component: () =>
                import ('@/components/goodsList/goodsList'),
            meta: {
                title: "订单详情"
            }
        },
        {
            path: '/categoryItem/:id',
            name: 'categoryItem',
            component: () =>
                import ('@/pages/categoryItem/categoryItem'),
            meta: {
                title: "故事列表"
            }
        },
        {
            path: '/rentPay/succesc',
            name: 'rentPay',
            component: () =>
                import ('@/pages/rentPay/success'),
            meta: {
                title: "提交成功"
            }
        },
        {
            path: '/orderList/goodsList/:id',
            name: 'goodsList',
            component: () =>
                import ('@/components/orderList/goodsList'),
            meta: {
                title: "商品列表"
            }
        },
        {
            path: '/commetOrder',
            name: 'commetOrder',
            component: () =>
                import ('@/pages/comment/commetOrder'),
            meta: {
                title: "评论"
            }
        },
        {
            path: '/goodsComment/:id',
            name: 'goodsComment',
            component: () =>
                import ('@/pages/goodsComment/index'),
            meta: {
                title: "评论"
            }
        },
        {
            path: '/commentItme',
            name: 'commentItme',
            component: () =>
                import ('@/pages/comment/commentItme'),
            meta: {
                title: "评论"
            }
        },
        {
            path: '/refund',
            name: 'refund',
            component: () =>
                import ('@/pages/refund/refund'),
            meta: {
                title: "申请退款"
            }
        },
        {
            path: '/returnGoods/:id',
            name: 'returnGoods',
            component: () =>
                import ('@/pages/returnGoods/index'),
            meta: {
                title: "申请退货"
            }
        },
        {
            path: '/ReturnOrderDesc/:id',
            name: 'ReturnOrderDesc',
            component: () =>
                import ('@/pages/ReturnOrderDesc/index'),
            meta: {
                title: "退货信息"
            }
        },
        {
            path: '/voice',
            name: 'voice',
            component: () =>
                import ('@/pages/voice/index'),
            meta: {
                title: "编辑推荐"
            }
        },
        {
            path: '/bugRentBook/:id',
            name: 'bugRentBook',
            component: () =>
                import ('@/pages/bugRentBook/index'),
            meta: {
                title: "买断"
            }
        },
        {
            path: '/rule',
            name: 'rule',
            component: () =>
                import ('@/pages/rule/index'),
            meta: {
                title: "用户须知"
            }
        },
        {
            path: '/dataDesc/:id',
            name: 'rule',
            component: () =>
                import ('@/pages/rule/desc'),
            meta: {
                title: "详情"
            }
        },
        //  买断商品列表 goodDesc
        {
            path: '/goodListDesc',
            name: 'goodListDesc',
            component: () =>
                import ('@/pages/bugBookRent/goodDesc'),
            meta: {
                title: "商品列表"
            }
        },
        {
            path: '/ghxz',
            name: 'ghxz',
            component: () =>
                import ('@/pages/rule/ghxz'),
            meta: {
                title: "归还须知"
            }
        },
        {
            path: '/goVip',
            name: 'goVip',
            component: () =>
                import ('@/components/goVip/index'),
            meta: {
                title: "vip"
            }
        },
        {
            path: '/test',
            name: 'test',
            component: () =>
                import ('@/components/test.vue'),
            meta: {
                title: "vip"
            }
        },
        {
            path: '/makeExpress/:id',
            name: 'makeExpress',
            component: () =>
                import ('@/pages/makeExpress/makeExpress'),
            meta: {
                title: "预约快递"
            }
        },
        //选择发件人接收快递地址 selectAddress.vue
        {
            path: '/selectAddress',
            name: 'selectAddress',
            component: () =>
                import ('@/pages/makeExpress/selectAddress'),
            meta: {
                title: "选择地址"
            }
        },
        //买断
        {
            path: '/bugBookRent/:id',
            name: 'bugBookRent',
            component: () =>
                import ('@/pages/bugBookRent/index'),
            meta: {
                title: "买断"
            }
        },
        {
            path: '/bugRentOrder/:id',
            name: 'bugRentOrder',
            component: () =>
                import ('@/pages/bugBookRent/bugRentOrder'),
            meta: {
                title: "买断订单"
            }
        },
        {
            path: '/rentGoodsList/:id',
            name: 'rentGoodsList',
            component: () =>
                import ('@/components/orderList/rentGoodsList'),
            meta: {
                title: "商品列表"
            }
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    // if (to.path == '/goVip') {
    //     next()
    //     return
    // }
    // if (to.path == '/getUserInfo') {
    //     next()
    //     return
    // }
    next()
        // 判断微信是否已授权 
        // if (!(getToken())) {
        //     // 存储userID
        //     next('/getUserInfo')
        // } else {
        //     next()
        // }
})

export default router