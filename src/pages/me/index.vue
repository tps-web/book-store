<template>
  <div class="me">
    <div class="top">
      <!-- <van-icon name="arrow-left" size="30" class="icon"/> -->
      <div class="user_mess">
         <van-image
           round
           :src="userInfo.userHead"
           class="avater"
         />
       <div class="name">{{userInfo.userNickName}}</div>
      </div>
    </div>
    <div class="user_group">
      <div class="all" @click="gourl('0/1-a')">全部订单 <span style="float:right"><van-icon name="arrow" size="16"/></span></div>
      <div class="box">
        <div @click="gourl('0/1-b')">
            <van-image :src="require('../../assets/images/dfk.png')" class="bgImg" />
            <div class="box_name">待付款</div>
        </div>
          <div  @click="gourl('0/1-c')">
            <van-image :src="require('../../assets/images/dfh.png')" class="bgImg" />
            <div class="box_name">待发货</div>
        </div>
         <div  @click="gourl('0/1-d')">
            <van-image :src="require('../../assets/images/dsh.png')" class="bgImg" />
            <div class="box_name">待收货</div>
        </div>
         <div  @click="gourl('1/b')">
            <van-image :src="require('../../assets/images/dgh.png')" class="bgImg" />
            <div class="box_name">待归还</div>
        </div>
         <div  @click="gourl('0/1-e')">
            <van-image :src="require('../../assets/images/dpj.png')" class="bgImg" />
            <div class="box_name">待评价</div>
        </div>
          
      </div>
      <!-- <div class="box" v-for="(item,index) in user_group" :key="index" @click="gourl(item)">
           <van-image :src="item.bgImg" class="bgImg">
             <div class="van-info">1</div>
           </van-image>
           <div class="box_name">{{item.name}}</div>
      </div> -->
    </div>
     <van-cell  value="会员中心"   is-link  :icon="require('../../assets/images/vipIcon.png')" :to="userInfo.memberFlag!=0?'/zVip':'/vip'"  class="vip" />
     <!-- <van-cell  value="会员中心"   is-link  :icon="require('../../assets/images/vipIcon.png')" :to="memberInfo!=null?'/zVip':'/vip'"  class="vip" /> -->
    <div class="setting_group">
      <van-cell  value="帮助中心"   is-link  :icon="require('../../assets/images/help.png')" to="/help" size="large" />
      <van-cell  value="收货地址"   is-link  :icon="require('../../assets/images/shdz.png')" to="/address" size="large" />
      <van-cell  value="优惠券"     is-link  :icon="require('../../assets/images/yhj.png')" to="/coupon" size="large" />
      <van-cell  value="兑换中心"   is-link  :icon="require('../../assets/images/yhzx.png')" to="/convert" size="large"  />
    </div>
    <!-- <button @click="test">测试{{userInfo.memberFlag}}</button> -->
  <navigate/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Me',
  data () {
    return {
    }
  },
  computed:{
     ...mapState(['userInfo','memberInfo'])
  },
  components:{
  },
  mounted(){
   
  },
  methods:{
    test(){
      window.android.refundOrder('20200818155603749');  //js 调用 android
    },
    gourl(item){
      // console.log(item)
      // this.$router.push(`/bugAndRent/${item}`)
      this.$router.replace(`/bugAndRent/${item}`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.me{
  position: relative;
}
.top{
  width:100%;
  height:170px;
  background-image:  url(../../assets/images/top.png);
  background-size:100%;
  border-radius: 0 0 20px 20px;
}
.icon{
  position: absolute;
  top: 10px;
  left: 10px;
}
.user_mess{
  position: absolute;
  top: 30px;
  left: 30px;
  display: flex;
}
.avater{
  width: 80px;
  height:80px;
  border: 1px solid rgba(255,255,255,1);
}
.name{
  font-size: 22px;
  margin-left: 10px;
  color:rgba(34,34,34,1);
  height:80px;
  line-height: 80px;
}
.user_group{
   position: relative;
   top: -40px;
   width: 86%;
   margin: 0 auto;
   padding: 18px 10px;
   background:rgba(255,255,255,1);
   box-shadow:0px -2px 8px 0px rgba(0,0,0,0.1);
   border-radius:8px;
}
.all{
  width: 94%;
  margin: 0 auto;
  text-align: left;
}
.box{
  width: 92%;
  margin: 10px auto 0;
  padding: 8px 4px 0px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}
.bgImg{
  width: 32px;
}
.box_name{
  margin-top:6px;
}
.setting_group{
  width: 90%; 
  margin: 0 auto;
  padding: 4px;
  background:rgba(255,255,255,1);
  box-shadow:0px -2px 8px 0px rgba(0,0,0,0.1);
  border-radius:4px;
}
.vip{
  width: 92%;
  margin: -20px auto 16px;
  padding: 12px;
  background:rgba(255,255,255,1);
  box-shadow:0px -2px 8px 0px rgba(0,0,0,0.1);
  border-radius:4px;
}
.van-icon__image {
    width: 1.5em;
    height: 1.5em;
}
.van-cell__value--alone{
  margin-left:8px;
}
</style>
