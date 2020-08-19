<template>
  <div class="">
      <div class="top">
         <!-- <van-icon name="arrow-left" size="30" class="icon_back" @click="goBack"/> -->
        <div class="tabs_content">
        <van-tabs v-model="activeItem" sticky @change="onChange">
            <van-tab title="借书" name="1">
                <van-tabs v-model="rentActive" swipeable sticky @change="rentChange">
                  <van-tab title="全部订单" name="a">
                   <RentAll/>
                  </van-tab>
                  <van-tab title="待归还" name="b">
                    <delayPayment/>
                  </van-tab>
                  <van-tab title="待发货" name="c">
                    <delayShipments/>
                  </van-tab>
                  <van-tab title="待收货" name="d">
                    <delayTake/>
                  </van-tab>
                  <van-tab title="待评价" name="e">
                    <delayPingjia/>
                  </van-tab>
                  <van-tab title="已取消" name="f">
                    <cancelBox />
                  </van-tab>
                </van-tabs>
            </van-tab>
            <van-tab title="购买" name="0">
                <van-tabs v-model="bugActive" swipeable sticky @change="bugChange">
                  <van-tab title="全部订单" name="1-a">
                    <BugAll/>
                  </van-tab>
                  <van-tab title="待付款" name="1-b">
                    <Payment/>
                  </van-tab>
                  <van-tab title="待发货" name="1-c">
                    <Shipments />
                  </van-tab>
                  <van-tab title="待收货" name="1-d">
                    <Take/>
                  </van-tab>
                  <van-tab title="待评价" name="1-e">
                    <Comment/>  
                  </van-tab>
                  <van-tab title="退款" name="1-h">
                    <returnOrder/>  
                  </van-tab>
                   <van-tab title="已取消" name="1-f">
                    <cancelView/>  
                  </van-tab>
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
import RentAll from './rent/all'
import delayPayment from './rent/delayPayment'
import delayShipments from './rent/delayShipments'
import delayTake from './rent/delayTake'
import delayComment from  './rent/delayComment'
import cancelBox from './rent/cancelBox'
import delayPingjia from './rent/delayPingjia'

import Payment from './bug/delayPayment'
import Shipments from './bug/delayShipments'
import Take from './bug/delayTake'
import Comment from  './bug/delayComment'
import cancelView from './bug/cancelBox'
import  returnOrder from './bug/returnOrder'

export default {
  components:{
    Bug,
    Rent,
    BugAll,
    RentAll,
    delayPayment,
    delayShipments,
    delayTake,
    delayComment,
    cancelBox,
    Payment,
    Shipments,
    Take,
    Comment,
    cancelView,
    delayPingjia,
    returnOrder
  },
  data () {
    return {
       activeItem: this.$route.params.path,
       rentActive:this.$route.params.pathChildren,
       bugActive:this.$route.params.pathChildren,
    }
  },
  created(){
   sessionStorage.setItem('path',this.$route.params.path)
   sessionStorage.setItem('pathChildren',this.$route.params.pathChildren)
  },
  mounted(){
  if (window.history && window.history.pushState) {
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', this.goBack, false);
  }
},
destroyed(){
  window.removeEventListener('popstate', this.goBack, false);
},
  methods:{
    goBack(){
     this.$router.replace({path: `/me`});
     //replace替换原路由，作用是避免回退死循环
  },
      // goBack(){
      //      history.back();
      // },
      onChange(activeItem){
        sessionStorage.setItem('path',activeItem)
      },
      rentChange(rentActive){
        sessionStorage.setItem('pathChildren',rentActive)
      },
      bugChange(bugActive){
        sessionStorage.setItem('pathChildren',bugActive)
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
