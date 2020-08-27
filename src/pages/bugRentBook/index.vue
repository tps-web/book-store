<template>
  <div>
       <div class="top">
          <van-image :src="require('../../assets/images/top.png')" class="top_img"/>
           <div class="top_tit">买断
           </div>
      </div>
      <!-- 商品列表 -->
      <goodList   :goodsList="newList"/>
      <!-- {{newList}} -->
      <div class="deliver_msg">
          <van-cell title="商品金额"  :value="total"  title-style="text-align: left;" />
          <!-- 优惠券 -->
          <van-cell title="优惠券" is-link :value="useCouponText"  title-style="text-align: left;" @click="showCoupon = true"/>
           <van-popup v-model="showCoupon"  position="bottom"  :style="{ height: '40%' }" round >
             <Coupon  :goodsTotal='total' @selectCoupon="selectCoupon" />
          </van-popup>
          <van-cell title="应付金额"  :value="payAmount"  title-style="text-align: left;" />
      </div>
      <pay  :show='isShow' :payAmount='payAmount' @closepop="closepop" @confirmData='confirmData'/>
      <div class="bugBtn" @click="bayBug">买断</div>
  </div>
</template>

<script>
import {getOrderDesc,updateOrder,getBookDesc} from '@/api'
import goodList from './goodList'
import Coupon from './coupon'
import pay from '@/components/pay/index'
import { mapMutations, mapState, mapGetters, mapActions } from 'vuex'
import {formatBugGoods} from '@/utils'
export default {
   components:{
     goodList,
     Coupon,
     pay
  },
  data () {
    return {
       goodsList:'',
       showCoupon:false, //是否展示优惠券
       useCouponText:'', //优惠券文案
       couponNum:0,   //优惠券价额
       couponItem:'',
       isShow:false,
       newList:[]
    }
  },
  computed:{
    ...mapGetters({getCouponList:'getCouponList'}),
    //总价
    total(){
        if(this.newList){
            var totalNum=0
            this.newList.forEach(element => {
                var realPerice= element.promotionAmount==null?element.price:element.promotionAmount
                totalNum+=realPerice
            });
            return totalNum
        }
    },
    //应付金额  减去优惠券 
    payAmount(){
         if(this.newList){
            var paytotalNum=0
             this.newList.forEach(element => {
                var realPerice= element.promotionAmount==null?element.price:element.promotionAmount
                paytotalNum+=realPerice
            });
            if(this.couponNum){
                paytotalNum-=this.couponNum
            }
            return paytotalNum
        }
    },
  },
  created(){
    getOrderDesc( this.$route.params.id ).then(res=>{
        // this.goodsList=res.data.item.list
        var arr=res.data.item.list
        let op={curPage :1,isHotSearch :0,pageRows :1 }
        arr.forEach(ele=>{
            op.id=ele.bookId
           getBookDesc(op).then(res=>{
               this.newList.push(res.data.book)              
           })
        })
    })
  },
  methods:{
    confirmData(){
      // payType 支付方式 status 状态 0  orderType订单类型 0  payAmount 应付金额   totalAmount 总金额
      let op={payType:0,
      payAmount:this.payAmount,
      totalAmount:this.total,
      couponSn:this.couponItem.couponHistoryId,
      couponAmount:this.couponItem.amount}
       console.log(op)
    },
    closepop(){
      this.isShow=!this.isShow
    },
    bayBug(){
      console.log(formatBugGoods(this.newList))
      this.isShow=true
    },
    //选择优惠券
    selectCoupon(couponItem){
      if(couponItem){
        this.couponItem=couponItem
        var couponTest='减'+couponItem.amount
         this.useCouponText=couponTest //优惠券文案
         this.couponNum=couponItem.amount  //优惠券价额
        this.showCoupon=false
      }else{
         this.useCouponText='' //优惠券文案 
         this.couponNum=0 //优惠券价额
        this.showCoupon=false
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bugBtn{
    width: 100%;
    height: 50px;
    color: #fff;
    line-height: 50px;
    background: #ee0a24;
    position: fixed;
    bottom: 0;
}
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
.box{
  width: 94%;
  margin: 6px auto;
  border:1px solid red;
  border-radius: 6px;
  padding: 6px 4px;
  display: flex;
}
.boxDesc{
  margin-left: 10px;
  text-align: left;
}
.imgBox{
  width: 78px;
  height: 88px;
  display:-webkit-flex;
  display:flex;
  -webkit-flex-flow : column nowrap;
  flex-flow : column nowrap;
}
.boxImg{
   width: 100%;
    /* height: 170px; */
    margin-left : auto;
    margin-right : auto;
    margin: auto;
}
</style>
