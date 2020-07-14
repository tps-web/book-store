// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './config/components.js'
import './assets/js/resizing.js'



import { Image as VanImage } from 'vant';
Vue.use(VanImage);

import navigate from './components/footer/navigate.vue'
import headerNav from './components/header/nav.vue'
import goodsItem from './components/goodsItem/item.vue'
import headline from './components/headline/headline.vue'


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
    components: { App },
    template: '<App/>'
})