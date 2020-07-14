<template>
  <div class="warp" ref="warp">
    <div class="warp_box">
     <div class="box" v-for="(item,index) in 100" :key="index" ref="good">
           <van-image
              width="66px"
              height="66px"
             src="https://img.yzcdn.cn/vant/cat.jpeg"
           />
           <div>{{list}}</div>
     </div>
   </div>
 </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
   props:{
     list:Number, 
   },
  data () {
    return {
    }
  },
  mounted(){
      this._initData()
  },
  watch: {
    list () {
      // 初始化更新滑动组件
      this.$nextTick(() => {
        this._initData();
      });
    }
  },
  methods:{
      // 1.4.初始化滚动视图
     _initData(){
      if (!this.rightScroll) {
        this.$nextTick(() => {
          this.rightScroll = new BScroll(this.$refs.warp, {
            probeType: 3,
            click: true,
          })
      })
      } else {
          this.rightScroll.refresh()
            // 2.1 进入默认商品列表滚到顶部
          this.rightScroll.scrollToElement(this.$refs.good[0], 10, 0, 0);
      }
   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.warp{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.warp_box{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.box{
  /* margin: 0 6px; */
  padding: 6px;
}
</style>
