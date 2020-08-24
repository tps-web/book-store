// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './config/components.js'
import './assets/js/resizing.js'


import store from './store'

import { Image as VanImage } from 'vant';
Vue.use(VanImage);

import navigate from './components/footer/navigate.vue'
import headerNav from './components/header/nav.vue'
import goodsItem from './components/goodsItem/item.vue'
import headline from './components/headline/headline.vue'

// import Back from './back.js'
//过滤器
Vue.filter('testfilter', function(value, num) {
        // 返回处理后的值
        if (value.length < num) {
            return value.substring(0, num)
        } else {
            return value.substring(0, num) + '...'
        }
    })
    //保留两位小数
Vue.filter('decimals', function(value) {
    // 返回处理后的值
    if (value) {
        return value.toFixed(2)
    }
})

Vue.filter('returnStatusText', function(id) {
    // 申请退款状态：0->待处理；1->退货中；2->已完成；3->已拒绝
    var obj = {
        '0': '待处理',
        '1': '退货中',
        '2': '已完成',
        '3': '已拒绝',
    }
    for (var key in obj) {
        if (key == id) {
            return obj[key]
        }
    }
})


Vue.filter('orderStatus', function(id) {
        var obj = {
            '-1': '全部订单',
            '0': '待付款',
            '1': '待发货',
            '2': '待收货',
            '3': '待归还',
            '4': '待评价',
            '5': '已关闭',
            // '6': '无效订单'
            '6': '退款'
        }
        for (var key in obj) {
            if (key == id) {
                return obj[key]
            }
        }
    })
    //  订单状态：-1->全部订单；0->待付款；1->待发货；2->待收货；3->待归还；4->待评价；5->已关闭；6->无效订单 
Vue.filter('btnText', function(id) {
    var obj = {
        '-1': '全部订单',
        '0': '待付款',
        '1': '待发货',
        // '2': '待收货',
        '2': '查看物流',
        '3': '待归还',
        '4': '待评价',
        '5': '已关闭',
        // '6': '无效订单'
        '6': '退款'
    }
    for (var key in obj) {
        if (key == id) {
            return obj[key]
        }
    }
})

Vue.config.productionTip = false

//底部导航组件
Vue.component("navigate", navigate)
    //商品item组件
Vue.component("goodsItem", goodsItem)
    // 页面标题
Vue.component("headline", headline)
    //顶部标题
Vue.component("headerNav", headerNav)


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})