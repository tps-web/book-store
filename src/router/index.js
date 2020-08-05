import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import store from '@/store'
Vue.use(Router)
import { setToken } from '@/utils/authcookie'

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
            path: '/edit/:id',
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
            path: '/logistics',
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
            name: 'goodsList',
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
            name: 'success',
            component: () =>
                import ('@/pages/rentPay/success'),
            meta: {
                title: "提交成功"
            }
        },
        {
            path: '/orderList/goodsList/:id',
            name: 'success',
            component: () =>
                import ('@/components/orderList/goodsList'),
            meta: {
                title: "商品列表"
            }
        },
        {
            path: '/commetOrder',
            name: 'success',
            component: () =>
                import ('@/pages/comment/commetOrder'),
            meta: {
                title: "评论"
            }
        },

    ]
})
var info = {
    "code": "1",
    "data": {
        "userId": 169,
        "userCode": "",
        "userTelphone": "18813580769",
        "userRegistDatetime": "2020-04-07 10:30:55",
        "regId": "",
        "alias": "uid_169",
        "tag": "",
        "birthday": "",
        "hasBindQq": 0,
        "hasBindWeixin": 0,
        "hasBindApple": 0,
        "isThreeLogin": 0,
        "myqrcode": "",
        "phoneDeviceCode": "null",
        "phoneDeviceName": "vivo V1824BA",
        "phoneDeviceType": "android",
        "sex": 0,
        "status": 1,
        "area": "",
        "userEmail": "",
        "userHead": "http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png",
        "userNickName": "ps",
        "userSign": "",
        "longitude": 0,
        "latitude": 0,
        "loginStatus": 1,
        "updateTime": "2020-05-02 02:51:03",
        "isRealUser": 1,
        "background": "",
        "soundType": 0,
        "isFollow": 0,
        "wxNickName": "",
        "wxUserHead": "",
        "qqNickName": "",
        "qqUserHead": "",
        "worksCount": 0,
        "type": 0
    },
    "msg": "登录成功",
    "serializeNulls": false
}
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (!store.state.userInfo) {
        setToken(info)
        store.dispatch('getUserInfo')
    }
    next()
})

export default router