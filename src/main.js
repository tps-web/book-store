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

import Back from './back.js'
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

Vue.filter('orderStatus', function(id) {
    var obj = {
        '-1': '全部订单',
        '0': '待付款',
        '1': '待发货',
        '2': '待收货',
        '3': '待评价',
        '4': '已关闭',
        '5': '无效订单'
    }
    for (var key in obj) {
        if (key == id) {
            return obj[key]
        }
    }
})
Vue.filter('btnText', function(id) {
    let obj = {
        '0': '待付款',
        '1': '待发货',
        '2': '查看物流',
        '3': '待评价',
        '4': '删除订单',
        '5': '无效订单'
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
    Back,
    router,
    store,
    components: { App },
    template: '<App/>'
})