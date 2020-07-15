<template>
  <div class="">
      <div class="top">
         <!-- <van-icon name="arrow-left" size="30" class="icon_back" @click="goBack"/> -->
        <div class="tabs_content">
        <van-tabs v-model="activeItem" sticky>
            <van-tab title="借书" name="0">
                <van-tabs v-model="rentActive" swipeable sticky>
                  <van-tab title="全部订单" name="a">
                  </van-tab>
                  <van-tab title="待归还" name="b">待归还</van-tab>
                  <van-tab title="待评价" name="c">待评价</van-tab>
                  <van-tab title="已取消" name="d">已取消</van-tab>
                </van-tabs>
            </van-tab>
            <van-tab title="购买" name="1">
                <van-tabs v-model="bugActive" swipeable sticky>
                  <van-tab title="全部订单" name="1-a">
                    <BugAll/>
                  </van-tab>
                  <van-tab title="待付款" name="1-b">待付款</van-tab>
                  <van-tab title="待发货" name="1-c">待发货</van-tab>
                  <van-tab title="待收货" name="1-d">待收货</van-tab>
                  <van-tab title="待评价" name="1-e">待评价 </van-tab>
                </van-tabs>
            </van-tab>
         </van-tabs>
        </div>
      </div>
  </div>
</template>

<script>
import Bug from './tabItem/bug'
import Rent from './tabItem/rent'
import BugAll from './bug/all'


export default {
  components:{
    Bug,
    Rent,
    BugAll
  },
  data () {
    return {
       activeItem: this.$route.params.path,
       rentActive:this.$route.params.pathChildren,
       bugActive:this.$route.params.pathChildren,
    }
  },
  created(){
   
  },
  watch:{
  
  },
  mounted(){
  },
  methods:{
      goBack(){
           history.back();
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top{
    display:flex;
    position: relative;
}
.icon_back{
  height: 44px;
  line-height: 44px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
.van-tabs__nav .van-tabs__nav--line{
    width: 100%;
    float: left;
}
.tabs_content{
    width: 100%;
}
</style>
