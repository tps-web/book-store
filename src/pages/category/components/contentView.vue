<template>
  <div class="warp" ref="warp">
    <div class="warp_box">
     <div class="box" v-for="(item,index) in data" :key="index" ref="good" @click="goUrl(item)">
           <van-image
             class="img"
             :src="item.image"
           />
           <div class="name">{{item.name}}</div>
     </div>
   </div>
 </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
   props:{
     list:Number, 
     data:Array
   },
  data () {
    return {
    }
  },
  created(){
  
  },
  mounted(){
    console.log(this.data)
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
    goUrl(item){
      console.log(item)
      this.$router.push(`categoryItem/${item.id}`)
    },
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
.img{
  width: 66px;
  height: 66px;
}
.warp_box{
  display: flex;
  flex-wrap: wrap;
  /* justify-content:space-around; */
  justify-self: start;
}
.box{
  border-radius: 5px;
  box-shadow:0px 0px 4px 0px rgba(0,0,0,0.1);
  margin: 6px 4px;
  padding: 8px;
}
.name{
  width: 66px;
}
</style>
