<template>
  <div class="">
     <!-- <headerNav title="会员中心"/> -->
     <div class="top">
       <van-image
        width="100%"
        height="200" :src="require('../../../assets/images/bg.png')" />
     </div>
     <div class="box">
      <van-image
        :src="require('../../../assets/images/vipImg.png')" class="vipImg"/>
       <van-grid :column-num="4" :border="false">
         <van-grid-item  >
           <div class="yuan">
             <span class="font">正</span>
           </div>
           <div style="margin-top:6px;font-size:12px">正片保证</div>
         </van-grid-item>
          <van-grid-item  >
           <div class="yuan">
             <span class="font">往</span>
           </div>
           <div style="margin-top:6px;font-size:12px">往返包邮</div>
         </van-grid-item>
          <van-grid-item  >
           <div class="yuan">
             <span class="font">百</span>
           </div>
           <div style="margin-top:6px;font-size:12px">百万绘本</div>
         </van-grid-item>
          <van-grid-item  >
           <div class="yuan">
             <span class="font">正</span>
           </div>
           <div style="margin-top:6px;font-size:12px">正片保证</div>
         </van-grid-item>
        </van-grid>
     </div>
     <div class="vipBug">
        <van-cell title="荟声VIP年卡"   :value="'￥'+payPerice" title-style="text-align: left" value-class="textClass" />
        <van-cell title="会员卡有效期"  :value="yearNum+'个月'" title-style="text-align: left" size="large"  />
         <!-- <van-popup v-model="showExpress"  position="bottom" >  @click="showExpress=true"
          <van-picker   
            title="选择开通月数"
            show-toolbar
            :default-index="0"
            :columns="columns"
            value-key = "expressName"
            @confirm="Confirm"
            @cancel="onCancel"
        />
        </van-popup> -->
     </div>
     <!-- 支付 -->
      <van-dialog v-model="show" title="支付订单" confirmButtonText="去支付"  @confirm="confirm()" :before-close="onBeforeClose">
      <van-icon name="close" size="24" class="close" @click="closeBtn"/>
         <div class="payNum">￥{{payPerice}}</div>
         <van-radio-group v-model="radio" class="radioBox">
            <van-radio name="2"  class="payBtn">
                <van-image :src="require('../../../assets/images/wxpay.png')" class="payImg"/>
                <span class="payText">微信支付</span>
            </van-radio>
            <!-- <van-radio name="1"  class="payBtn">
              <van-image :src="require('../../../assets/images/zfbpay.png')" class="payImg"/>
                <span class="payText">支付宝支付</span>
            </van-radio> -->
         </van-radio-group>
     </van-dialog>

     <van-cell value="会员须知" is-link class="xuzhi" size="large" @click="goDesc('会员须知')"/>
     <van-cell value="会员权益" is-link class="quanyi" size="large" @click="goDesc('会员权益')"/>

     <div class="btn" @click="goPay">{{userInfo.memberFlag==0?'立即开通':'立即续费'}}</div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {getNowFormatDate} from '@/utils'
import { getAllDataByType,postOrder,wxPay,getUserMemberLevel } from "@/api";
export default {
  data () {
    return {
      show:false,
      yearNum:'',
      showExpress:false,
      columns:[12,24,36,48],
      payPerice:'',
      memberLevelId:4,
      radio:'2'
    }
  },
   computed:{
     ...mapState(['userInfo','memberInfo'])
  },
  created(){
    // getAllDataByType('年卡费用').then(res=>{
    //   // console.log(res.data.rows[0].dataContent)
    //   this.payPerice=res.data.rows[0].dataContent
    // }),
    getUserMemberLevel(1).then(res=>{
      this.payPerice=res.data.item.data.memberFees
      this.yearNum=res.data.item.data.memberYear*12
      // console.log(this.yearNum)
    })
  },
  methods:{
    closeBtn(){
      this.show=false
    },
     onBeforeClose(action, done){
       if (action === "confirm") {
        return done(false);
       }else{
         return done();
         this.radio=2
       }
    },
    confirm(){
       let op={
          userId:this.userInfo.userId,
          userNickName:this.userInfo.userNickName,
          payAmount:this.payPerice,
          orderType:2,
          payType:this.radio,
          status:0,
          totalAmount:this.payPerice,
          sourceType:1
       }
       postOrder(op).then(res=>{
        //  console.log(res.data.item.id)
          sessionStorage.setItem('orderId',res.data.item.id)
          sessionStorage.setItem('orderType',res.data.item.orderType)
            wxPay(res.data.item.orderSn).then(res=>{
              // console.log(res)
              var op =JSON.stringify(res.data.item)
              window.android.androidToPay(op);
              this.show=false
           })
       })
    },
    goDesc(str){
      getAllDataByType(str).then(res=>{
        this.$router.push(`/dataDesc/${res.data.rows[0].id}`)
      })
    },
    // Confirm(value, index){
    //   this.payPerice=365
    //   this.yearNum=value
    //   this.showExpress=false
    //   this.payPerice= this.payPerice*(value/12)
    // },
    onCancel(){
      this.showExpress=false
    },
    goPay(){
      this.show=true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
  position: relative;
  width: 88%;
  margin: 10px auto;
  margin-top: -70px;
  background: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
}
.vipImg{
  width: 88px;
  height: 88px;
  position:absolute;
  top: -50px;
  left: -35px;
  z-index: 1;
}
.yuan{
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #000;
}
.font{
  font-size: 16px;
  color: #FFCD00;
  height: 44px;
  line-height: 44px;
}
.vipBug{
  width: 88%;
  margin: 20px auto;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
}
.textClass{
  color: red;
}
.xuzhi{
  width: 88%;
  margin: 20px auto 0;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
}
.quanyi{
  width: 88%;
  margin: 0px auto;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
}
.btn{
  width: 100%;
  height: 45px;
  line-height: 45px;
  position:absolute;
  bottom: 0;
  background:rgba(255,205,1,1);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
}
.close{
  position:absolute;
  right: 20px;
  top: 20px;
}
.payNum{
  width: 100%;
  margin: 6px 0;
  height: 40px;
  line-height: 40px;
  color: #3080AA;
  font-size: 24px;
}
/deep/ .van-radio__icon{
    position: absolute!important;
    right: 10px!important;
}
.payImg{
  width: 24px;
  height: 24px;
  position: relative;
  top: 6px;
}
.payText{
  display: inline-block;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  margin-left: 2px;
}
.payBtn{
  width: 96%;
  margin: 6px auto;
  height: 44px;
}
</style>
