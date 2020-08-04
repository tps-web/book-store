<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
// import './assets/css/common.css';

export default {
  name: 'App',
   provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
    methods: {
      reload () {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      }
    },
  mounted(){
      // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
      window.onbeforeunload = function (e) {
          var storage = window.localStorage;
          storage.clear()
      }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 14px;
}
.amap-logo {
        right: 0 !important;
        left: auto !important;
        display: none !important;
    }
    
.amap-copyright {
        right: 70px !important;
        left: auto !important;
        opacity:0 !important;
 }
</style>
