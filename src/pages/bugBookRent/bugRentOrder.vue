<template>
  <div>
       <div class="top">
          <van-image :src="require('../../assets/images/top.png')" class="top_img"/>
           <div class="top_tit">买断
           </div>
      </div>
         <!-- 商品列表 -->
        <goodList   :goodsList="CheckGoods"/>
        <div class="deliver_msg">
          <van-cell title="商品金额"  :value="RENT_BOOK_TOTAL"  title-style="text-align: left;" />
          <!-- 优惠券 -->
          <van-cell title="优惠券" is-link :value="useCouponText"  title-style="text-align: left;" @click="showCoupon = true"/>
           <van-popup v-model="showCoupon"  position="bottom"  :style="{ height: '40%' }" round >
             <Coupon  :goodsTotal='RENT_BOOK_TOTAL' @selectCoupon="selectCoupon" />
          </van-popup>
          <van-cell title="应付金额"  :value="payAmount"  title-style="text-align: left;" />
      </div>
      <pay  :show='isShow' :payAmount='payAmount' @closepop="closepop" @confirmData="confirmData"/>
       <div class="bugBtn" @click="bayBug">买断</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import goodList from './goodList'
import Coupon  from './coupon'
import {jian} from '@/utils'
import pay from '@/components/pay/index'
import {getToken} from '@/utils/authcookie'
import {postOrder,wxPay} from '@/api'
export default {
  components:{
      goodList,
      Coupon,
      pay
  },
  data () {
    return {
        isShow:false,
     showCoupon:false,
     couponItem:'',  //选中优惠券
     useCouponText:'', //优惠券文案
     couponNum: 0 //优惠券价额
    }
  },
  computed:{
      ...mapGetters(['bugRentBookList','CheckGoods','RENT_BOOK_TOTAL']),
      payAmount(){
        if(this.couponNum){
            var total=jian(this.RENT_BOOK_TOTAL,this.couponNum)
           return total
        }else{
            return this.RENT_BOOK_TOTAL
        }
      }
  },
  created(){
  },
  methods:{
      bayBug(){
          this.isShow=true
      },
    confirmData(payType){
      // payType 支付方式 status 状态 0  orderType订单类型 0  payAmount 应付金额   totalAmount 总金额
     var info = JSON.parse(getToken())
      let op={
          integration:0,
          integrationAmount:0,
          list:this.CheckGoods,
          orderType:0,
          payAmount:this.payAmount,
          payType:payType,
          sourceType:1,
          status:8,
          totalAmount: this.RENT_BOOK_TOTAL,
          userId:info.userId,
          userNickName:info.userNickName,
          oldOrderId:this.$route.params.id,
      }
       if(this.couponItem){
          op.couponAmount=this.couponItem.amount   //优惠券抵扣金额
          op.couponSn=this.couponItem.couponHistoryId
       }
      sessionStorage.setItem('orderType',3)
      postOrder(op).then(res=>{
        sessionStorage.setItem('orderId',res.data.item.id)
        wxPay(res.data.item.orderSn).then(res=>{ 
          var op =JSON.stringify(res.data.item)
          const u = navigator.userAgent;
          const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
          const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
          if(isIOS){
            window.webkit.messageHandlers.iOSToPay.postMessage(op)
          }else if(isAndroid){
            window.android.androidToPay(op);
          }
        })
      })
    },
    closepop(){
      this.isShow=!this.isShow
    },
   selectCoupon(couponItem ){
       if(couponItem ){
        this.couponItem=couponItem
        var couponTest='减'+couponItem.amount
         this.useCouponText=couponTest //优惠券文案
         this.couponNum=couponItem.amount  //优惠券价额
        this.showCoupon=false
      }else{
         this.couponItem=""
         this.useCouponText='' //优惠券文案 
         this.couponNum=0 //优惠券价额
         this.showCoupon=false
      }
   },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top{
  position: relative;
  top: 0;
  left: 0;
}
.top_img{
    width: 100%;
    height: 70px;
}
.top_tit{
    position:absolute;
    bottom: 25px;
    left: 20px;
    font-size: 20px;
    font-weight: 500;
    color:rgba(34,34,34,1);
}
.bugBtn{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: rgba(255,205,1,1);
}
.deliver_msg{
    width: 96%;
    margin: 20px auto 10px;
    box-shadow: 0 0 4px 0 rgba(0, 0,0,0.1);
}
</style>
