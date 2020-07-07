// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './config/components.js'

import { Image as VanImage } from 'vant';
Vue.use(VanImage);

import navigate from './components/footer/navigate.vue'
import headerNav from './components/header/nav.vue'



Vue.config.productionTip = false

Vue.component("navigate",navigate)

Vue.component("headerNav",headerNav)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
