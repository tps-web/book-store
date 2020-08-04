<template>
  <div class="">
      <!-- <headerNav title="订单" /> -->
      <!-- 选择收货地址-->
       <addAddress ref="currentAddress"/>
      <!-- <div class="address" v-if="currentAddress===''">
          <div class="addIcon" @click="selectAddress">
            <van-image :src="require('../../assets/images/address.png')" width="26" height="26" style="margin-top:14px"/>
            <div>添加收件人信息</div>
          </div>
      <div class="line"></div>
      </div>
      <div class="currentAddress" v-else @click="changeAddress">
        <div class="left">
          <van-icon name="location" size="40" color="#FFCD01" />
        </div>
        <div class="content"> 
            <div class="defaultName">{{currentAddress.name}}<span class="tel">{{currentAddress.tel}}</span> <span v-show="currentAddress.isDefault"><van-tag round type="primary">默认</van-tag></span></div>
            <div style="margin-top:4px">{{currentAddress.address}}</div>
        </div>
        <div class="right">
            <van-icon name="arrow" size="20" />
        </div>
        <div class="line"></div>
      </div> -->
      <!-- 商品列表-->
          <goods ref="goods"/>
       <!-- <div class="goods">
         <div class="bigBox">
           <div class="box" v-for="(item,index) in goods" :key="index" @click='goDetails(item)'>
             <van-image class="goodsImg" :src="item.smallImage" radius="6px" style="box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);"/>
           </div>
         </div>
          <div class="goods_right">
            共{{totalNum}}件商品<van-icon name="arrow" class="right_icon" />
          </div>
       </div> -->
       <!-- 发货信息 -->
       <div class="deliver_msg">
         <!-- 发货快递 -->
           <express ref="express"/>
          <!-- <van-cell title="选择快递" is-link :value="expressValue"  title-style="text-align: left;"  @click="showExpress=true"/>
          <van-popup v-model="showExpress"  position="bottom" >
            <van-picker
              title="选择快递"
              show-toolbar
              :default-index="0"
              :columns="columns"
              @confirm="expressConfirm"
              @cancel="onCancel"
           />
          </van-popup> -->
          <!-- 发货时间 -->
          <!-- <van-cell title="发货时间" is-link :value="date||selectDate"  title-style="text-align: left;" @click="dateShow = true"/> -->
          <!-- <van-calendar v-model="dateShow" @confirm="onConfirm" /> -->
          <!-- 优惠券 -->
          <van-cell title="优惠券" is-link :value="useCouponText"  title-style="text-align: left;" @click="showCoupon = true"/>
           <van-popup v-model="showCoupon"  position="bottom"  :style="{ height: '40%' }" round closeable>
             <Coupon  :coupon='getCouponList' @selectCoupon="selectCoupon" />
          </van-popup>
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
         <van-popup v-model="payShow" closeable position="bottom" :style="{ height: '50%' }">
           <div class="pay_title">支付方式</div>
           <div class="pay_num">￥ <span class="payNum">{{clearedNum}}</span></div>
           <van-radio-group v-model="radio" class="radioBtn">
             <div class="payWay">
               <van-radio name="wxpay" class="btn">
                 微信支付
                  <van-image :src="require('../../assets/images/wxpay.png')" class="payImg"/>
               </van-radio>
             </div>
              <div class="payWay"> 
                  <van-radio name="zfbpay" class="btn">支付宝支付
                  <van-image :src="require('../../assets/images/zfbpay.png')"  class="payImg"/>
                  </van-radio>
              </div>
            </van-radio-group>
             <van-button type="primary" size="large" round class="payBtn" @click="payBtn">确定</van-button>
             <van-button type="danger" size="large" round class="payBtn" @click="payCancel">取消</van-button>
         </van-popup>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'
import addAddress from '@/components/addAddress/addAddress'
import Coupon from './coupon/coupon'
import goods from '@/components/goods/goods'
import express from '@/components/express/express'
import {formatCoupon,formatGoods,add} from '@/utils'
import { getToken } from '@/utils/authcookie'

var that
export default {
  components:{
    Coupon,
    goods,
    express,
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
       payList:'' // 提交数据

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
    ...mapGetters({goods:'SELECTED_GOODS',clearedNum:'CLEARED_NUM',getCouponList:'getCouponList'}),
    showGoods(){
      let goodsArr=[]
      for(let i =0; i<3;i++){
        if(this.goods[i]){
           goodsArr.push(this.goods[i])
        }
      }
      return goodsArr
    },
    //商品总数
    totalNum(){
      return this.goods.length 
    },
   
    //优惠券选择提示
    // couponTest(){
    //   return this.usableArr.length>0?'选择优惠券':'无可用优惠券'
    // },
  },
  methods:{
    //取消支付
    payCancel(){
      this.payList.payType=0  //支付方式：0->未支付；1->支付宝；2->微信
      this.payList.status=0,   //订单状态：-1->全部订单；0->待付款；1->待发货；2->待收货；3->待评价；4->已关闭；5->无效订单
      console.log(this.payList)
    },
    //支付
    payBtn(){
      this.payShow=false
      this.$toast(this.radio)
      // this.$router.replace('/success')
    },
    goDetails(item){
      console.log(item)
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
            expressValue:this.$refs.express.expressValue,
            remarkValue:this.remarkValue
        }
        this.formatGoods(op.goods)
       
       if(!op.currentAddress){
           this.$toast('请填写地址')
       }else{
          var info = JSON.parse(getToken())
            // console.log(this.useCoupon)  //couponHistoryId  amount
            this.payList={
              "deliveryCompany": op.expressValue.expressName, // 物流名
              "confirmStatus":"0", // 确定收货
              "orderType": 0,   //订单类型 1 为借阅 0 为购书
              "receiverCity": op.currentAddress.city,   
              "receiverDetailAddress": op.currentAddress.address,
              "receiverName": op.currentAddress.name,
              "receiverPhone": op.currentAddress.tel,
              "receiverPostCode": op.currentAddress.postCode,
              "receiverProvince": op.currentAddress.province,
              "receiverRegion": op.currentAddress.region,
              "remark": op.remarkValue,
              "sourceType": 1,
              "userId": info.userId,
              "userNickName": info.userNickName,

              "couponSn": this.useCoupon.couponHistoryId,
              "couponAmount": this.useCoupon.amount,  //优惠券抵扣金额
              "payAmount": this.clearedNum,  //应付金额（实际支付金额）
              "totalAmount": add(this.clearedNum,this.useCoupon.amount) ,  //订单总金额 parseInt(this.clearedNum)  + 0 ||parseInt(this.useCoupon.amount)
             }
            this.payList.list=this.newList     
            this.payShow=true    
        }  
        
    },
  
    //选择优惠券
    selectCoupon(couponItem){
      // console.log(couponItem)
      this.$store.commit('SELETE_COUPON',couponItem)
         var couponTest='减'+couponItem.amount
        this.$store.commit('USECOUPONTEXT',couponTest)
      this.showCoupon=false
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
  expressConfirm(value, index){
    console.log(value)
    this.expressValue=value
    this.showExpress=false
  },
    onCancel() {
      this.showExpress=false
    },
  },
  created(){
    that=this
    // var couponList=formatCoupon(this.coupon)
    // console.log(this.clearedNum)
    // this.usableArr=couponList.usableArr
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  position: absolute;
  right: 10px;
  width: 24px;
  height: 24px;
}
.payBtn{
  width: 96%;
  margin: 6px auto;
  height: 44px;
}
</style>
