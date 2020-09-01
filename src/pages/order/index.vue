<template>
  <div class="">
      <!-- <headerNav title="订单" /> -->
      <!-- 选择收货地址-->
       <addAddress ref="currentAddress"/>
      <!-- 商品列表-->
          <goods ref="goods"/>
         <!-- <express ref="express" style=" width: 95%;margin: 10px auto;box-shadow:0px -2px 8px 0px rgba(0,0,0,0.1);"/> -->
       <!-- 发货信息 -->
       <div class="deliver_msg">
          <van-cell title="商品金额"  :value="allTotal"  title-style="text-align: left;" />
          <van-cell title="立减"      :value="all_discounts"  title-style="text-align: left;" />
          <!-- 优惠券 -->
          <van-cell title="优惠券" is-link :value="useCouponText"  title-style="text-align: left;" @click="showCoupon = true"/>
           <van-popup v-model="showCoupon"  position="bottom"  :style="{ height: '40%' }" round >
             <!-- <Coupon  :coupon='getCouponList' @selectCoupon="selectCoupon" />  -->
             <Coupon  @selectCoupon="selectCoupon"  />
          </van-popup>
          <!-- 发货时间 -->
          <!-- <van-cell title="发货时间" is-link :value="date||selectDate"  title-style="text-align: left;" @click="dateShow = true"/> -->
          <!-- <van-calendar v-model="dateShow" @confirm="onConfirm" /> -->
       </div>
       <!-- 备注 -->
       <div class="remark">
         <van-field v-model="remarkValue" label="备注留言" placeholder="选填，请先和平台协商一致" ref='field'/>
       </div>
       <!-- 结算 -->
       <div class="cleared" v-show="hidshow">
         <div class="clearedNum">
           <span>共计：</span><span class="num">{{clearedNum}}元</span>
         </div>
         <div class="clearedBtn" @click="cleareNum">
           提交订单
         </div>
       </div>
       <!-- 支付方式 -->
        <!-- @close="payCancel()" -->
         <van-popup v-model="payShow" closeable position="bottom" :style="{ height: '310px' }">
           <div class="pay_title">支付方式</div>
           <div class="pay_num">￥ <span class="payNum">{{clearedNum}}</span></div>
           <van-radio-group v-model="radio" class="radioBtn">
             <div class="payWay">
               <van-radio name="wxpay" class="btn">
                  <van-image :src="require('../../assets/images/wxpay.png')" class="payImg"/>
                  微信支付
               </van-radio>
             </div>
              <!-- <div class="payWay"> 
                  <van-radio name="zfbpay" class="btn">
                  <van-image :src="require('../../assets/images/zfbpay.png')"  class="payImg"/>
                    支付宝支付
                  </van-radio>
              </div> -->
            </van-radio-group>
             <van-button type="primary" size="large" round class="payBtn" @click="payBtn" :disabled="isDisable">确定</van-button>
             <van-button type="danger" size="large" round class="payBtn" @click="payCancel">取消</van-button>
         </van-popup>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters, mapActions } from 'vuex'
import addAddress from '@/components/addAddress/addAddress'
import Coupon from './coupon/coupon'
import goods from '@/components/goods/goods'
// import express from '@/components/express/express'
import {formatCoupon,formatGoods,add} from '@/utils'
import { getToken } from '@/utils/authcookie'
import {postOrder,wxPay,updateOrder} from '@/api'

var that
export default {
  components:{
    Coupon,
    goods,
    // express,
    addAddress
  },
  data () {
    return {
       docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
       showHeight: document.documentElement.clientHeight,   //实时屏幕高度
       hidshow:true,  //显示或者隐藏footer
       showExpress:false,  //是否展示快递
       dateShow:false,  //是否展示发货时间
       date:this.selectDate, //发货时间
      //  columns: ['系统默认','顺丰快递', '圆通快递', '申通快递'],
      //  expressValue:'系统默认', 
       showCoupon:false, //是否展示优惠券
       usableArr:[],  //优惠券
       remarkValue:'', //备注
       payShow:false, //支付方式
       radio:'wxpay',
       newList:'',  //格式商品对象格式
       payList:'', // 提交数据
       isDisable:false
    }
  },
  mounted(){
    // window.onresize监听页面高度的变化
    window.onresize = ()=>{
        return(()=>{
            // that.showHeight = document.body.clientHeight;
           that.showHeight= window.innerHeight;
        })()
    }
  },
  watch:{
    showHeight(){
        if(that.docmHeight > that.showHeight){
            that.hidshow=false
        }else if(that.docmHeight == that.showHeight){
          that.hidshow=true
        }
     }
  },
  computed:{
    ...mapState(['currentAddress','shopCart','coupon','useCoupon','useCouponText']),
    ...mapGetters({goods:'SELECTED_GOODS',clearedNum:'CLEARED_NUM',getCouponList:'getCouponList',priceTotal:'SELECTED_GOODS_PRICE',allTotal:'SELECTED_GOODS_TOTAL',all_discounts:'ALL_DISCOUNTS'}),
  },
  methods:{
    closeBtn(){
      
    },
    ...mapActions(['getCartList']),
    //取消支付
    payCancel(){
      this.payShow=false
      this.payList.payType=0  //支付方式：0->未支付；1->支付宝；2->微信
      this.payList.status=0,   //订单状态：-1->全部订单；0->待付款；1->待发货；2->待收货；3->待评价；4->已关闭；5->无效订单
      // console.log(this.payList)
      postOrder(this.payList).then(res=>{
          // console.log(res)
        this.$toast('已取消支付，请尽快支付')
        this.getCartList()
        this.$store.commit('SELETE_COUPON','')
        this.$store.commit('USECOUPONTEXT','')
        history.back();
      })
    },
    //支付
    payBtn(){
      if(this.radio=='wxpay'){
          // this.$toast('微信支付')
         this.payList.payType=2
         this.payList.status=0 
          postOrder(this.payList).then(res=>{
               this.payShow=false
              // console.log(res.data.item.orderSn)
              sessionStorage.setItem('orderId',res.data.item.id)
              sessionStorage.setItem('orderType',res.data.item.orderType)
              wxPay(res.data.item.orderSn).then(res=>{  
              var op =JSON.stringify(res.data.item)
                const u = navigator.userAgent;
                const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
                const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
                if(isIOS){
                  //  window.iOS.iOSToPay();
                  window.webkit.messageHandlers.iOSToPay.postMessage(op)
                }else if(isAndroid){
                  window.android.androidToPay(op);
                }
                // this.getCartList()
              })
          })
      }else{
        //  this.$toast('支付宝支付')
         this.payList.payType=1
        //  console.log(this.payList)
      }
      // this.$router.replace('/success')
    },
      //格式化商品
    formatGoods(list){
      //  console.log(list)
       const data=formatGoods(list)
      //  console.log(data) 
       this.newList=data
    },
    // 提交订单
    cleareNum(){
         let op={
            currentAddress:this.$refs.currentAddress.currentAddress,
            goods:this.$refs.goods.goods,
            // expressValue:this.$refs.express.expressValue,
            remarkValue:this.remarkValue
        }
        this.formatGoods(op.goods)
       if(!op.currentAddress){
           this.$toast('请填写地址')
       }else{
          var info = JSON.parse(getToken())
            // console.log(this.useCoupon)  //couponHistoryId  amount
            this.payList={
              // "deliveryCompany": op.expressValue.expressName, // 物流名
              "confirmStatus":"0", // 确定收货
              "orderType": 0,   //订单类型 1 为借阅 0 为购书
              //地址信息
              "receiverCity": op.currentAddress.city,   
              "receiverDetailAddress": op.currentAddress.address,
              "receiverName": op.currentAddress.name,
              "receiverPhone": op.currentAddress.tel,
              "receiverPostCode": op.currentAddress.postCode,
              "receiverProvince": op.currentAddress.province,
              "receiverRegion": op.currentAddress.region, 
              "remark": op.remarkValue,  //备注
              "sourceType": 1,  //	订单来源：0->PC订单；1->app订单
              "userId": info.userId,   //用户id
              "userNickName": info.userNickName,  //用户名
              "couponSn": this.useCoupon.couponHistoryId,  //优惠券编码
              "couponAmount": this.useCoupon.amount,  //优惠券抵扣金额
              "payAmount": this.clearedNum,  //应付金额（实际支付金额）
              "totalAmount": this.allTotal ,  //订单总金额 
              
              "promotionAmount":0,
              "integration":0,    //可以获得的积分
              "integrationAmount":0, //积分抵扣金额 
             }
            this.payList.list=this.newList     
            this.payShow=true    
        }  
    },
  
    //选择优惠券
    selectCoupon(couponItem){
      // console.log(couponItem)
      if(couponItem){
        this.$store.commit('SELETE_COUPON',couponItem)
        var couponTest='减'+couponItem.amount
        this.$store.commit('USECOUPONTEXT',couponTest)
        this.showCoupon=false
      }else{
        this.$store.commit('SELETE_COUPON','')
        this.$store.commit('USECOUPONTEXT','')
        this.showCoupon=false
      }
      // if(couponItem.type===0){
      //   var couponTest='减'+couponItem.price
      //   this.$store.commit('USECOUPONTEXT',couponTest)
      // }else{
      //   var couponTest='打'+couponItem.discount+'折'
      //   this.$store.commit('USECOUPONTEXT',couponTest)
      // }
    },
    selectAddress(){
        this.$router.push('/addAddress');
    },
    changeAddress(){
      this.$router.push('/addAddress');
    },
   //发货时间
    onConfirm(date){
      this.dateShow = false;
      var day=this.formatDate(date);
      this.date=day
  },
  },
  created(){
    that=this
    // console.log(this.goods)
    // var couponList=formatCoupon(this.coupon)
    // console.log(this.clearedNum)
    // this.usableArr=couponList.usableArr
  },
  beforeDestroy(){
     this.$store.commit('SELETE_COUPON','')
     this.$store.commit('USECOUPONTEXT','')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
.address{
    width: 96%;
    margin: 16px auto;
    height: 80px;
    position: relative;
}
.currentAddress{
    width: 95%;
    position: relative;
    margin: 16px auto;
    height: 80px;
    display: flex;
}
.left{
  margin: auto 0;
  flex: 2;
}
.content{
  flex: 6;
  margin: auto;
  text-align: left;
}
.defaultName{
  font-weight:500;
  font-size: 14px;
  color:rgba(34,34,34,1);
}
.tel{
  color: #999;
  margin-left: 5px;
}
.right{
  margin: auto 0;
  flex: 1.5;
}
.line{
    position: absolute;
    bottom: 0;
    width:100%;
    height: 2px;
    background: repeating-linear-gradient(-45deg,#ff6c6c 0,#ff6c6c 5%,transparent 6% ,transparent 7%,#1989fa 0,#1989fa 12%,transparent 13%,transparent 16%);
}
.addIcon{
    margin: 10px 0;
}
.goods{
  position: relative;
  width: 94%;
  height: 90px;
  margin: 18px auto;
  display: flex;
  padding: 4px;
  /* justify-content: space-between; */
  box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);
  border-radius: 6px;
}
.goods_right{
  position:absolute;
  right: 10px;
  top: 40px;
  /* margin: auto 0; */
  /* flex: 1.5; */
}
.bigBox{
  width: 250px;
  overflow-x: auto;
  display: flex;
}
.box{
  width: 75px;
  height: 75px;
  margin: auto 4px;
}
.goodsImg{
   width: 75px;
  height: 75px;
}
.right_icon{
  position: relative;
  top: 2px;
}
.deliver_msg{
  width: 95%;
  margin: 0 auto;
  box-shadow:0px -2px 8px 0px rgba(0,0,0,0.1);
}
.cleared{
  position:fixed;
  justify-content: space-between;
  bottom: 0;
  width: 100%;
  height: 50px;
  box-shadow:0px -2px 8px 0px rgba(0,0,0,0.1);
  display: flex;
  line-height: 50px;
}
.clearedNum{
  display: inline-block;
  margin-left: 10px;
}
.clearedNum .num{
  color: #FC5650;
}
.clearedBtn{
  width: 30%;
  height: 100%;
  background: #FC5650;
  color: #fff;
  box-shadow:0px -2px 8px 0px rgba(0,0,0,0.1);
}
.remark{
  width: 94%;
  margin: 20px auto;
  box-shadow:0px -2px 8px 0px rgba(0,0,0,0.1);
}
.pay_title{
  height: 40px;
  line-height: 40px;
}
.pay_num{
  margin: 10px auto;
  font-size: 20px;
}
.payNum{
  font-size: 46px;
  font-weight: 500;
}
.radioBtn{
 width: 96%;
 margin: 0 auto;
}
.btn{
  margin: 6px;
}
.payWay{
 position: relative;
 background:rgba(238,238,238,1);
 border-radius:8px;
 padding: 6px;
 margin: 6px 0;
}
.payImg{
  position: relative;
  top: 6px;
  margin-right: 4px;
  width: 24px;
  height: 24px;
}
.payBtn{
  width: 96%;
  margin: 6px auto;
  height: 44px;
}
/deep/ .van-radio__icon{
    position: absolute!important;
    right: 10px!important;
}
</style>
