<template>
  <div>
       <div class="top">
          <van-image :src="require('../../assets/images/top.png')" class="top_img"/>
           <div class="top_tit">买断
           </div>
      </div>
      <goodList :goodsList='goodsList'/>
      <div class="deliver_msg">
          <van-cell title="商品金额"  :value="total"  title-style="text-align: left;" />
          <!-- 优惠券 -->
          <van-cell title="优惠券" is-link :value="useCouponText"  title-style="text-align: left;" @click="showCoupon = true"/>
           <van-popup v-model="showCoupon"  position="bottom"  :style="{ height: '40%' }" round closeable>
             <Coupon  :coupon='getCouponList' @selectCoupon="selectCoupon" />
          </van-popup>
          <van-cell title="应付金额"  :value="payAmount"  title-style="text-align: left;" />
      </div>
      <div class="bugBtn" @click="bayBug">买断</div>
  </div>
</template>

<script>
import {getOrderDesc,updateOrder} from '@/api'
import goodList from './goodList'
import Coupon from '../order/coupon/coupon'
import { mapMutations, mapState, mapGetters, mapActions } from 'vuex'
export default {
   components:{
     goodList,
     Coupon
  },
  data () {
    return {
       goodsList:'',
       showCoupon:false, //是否展示优惠券
       useCouponText:'', //优惠券文案
       couponNum:'',   //优惠券价额
       couponItem:''
    }
  },
  computed:{
    ...mapGetters({getCouponList:'getCouponList'}),
    total(){
        if(this.goodsList){
            var totalNum=0
            this.goodsList.forEach(element => {
                // console.log(element)
                totalNum+=element.bookPrice
            });
            // if(this.couponNum){
            //     totalNum-=this.couponNum
            // }
            return totalNum
        }
    },
    payAmount(){
         if(this.goodsList){
            var paytotalNum=0
            this.goodsList.forEach(element => {
                // console.log(element)
                paytotalNum+=element.bookPrice
            });
            if(this.couponNum){
                paytotalNum-=this.couponNum
            }
            return paytotalNum
        }
    }
  },
  created(){
    getOrderDesc( this.$route.params.id ).then(res=>{
        // console.log(res.data.item.list)
        this.goodsList=res.data.item.list
    })
  },
  methods:{
    bayBug(){
          this.$dialog.alert({
                  message: "确定提交？", //改变弹出框的内容
                  showCancelButton: true //展示取水按钮
                })
              .then(() => { //点击确认按钮后的调用
                console.log('确定')
                let op={payType:0,payAmount:this.payAmount,totalAmount:this.total,couponSn:this.couponItem.couponHistoryId,couponAmount:this.couponItem.amount}
                console.log(op)
                // updateOrder().then(res=>{})
              })
              .catch(() => { //点击取消按钮后的调用
                  console.log("点击了取消按钮")
          })
    },
    //选择优惠券
    selectCoupon(couponItem){
       this.couponItem=couponItem
       this.useCouponText='减' + couponItem.amount
       this.couponNum=couponItem.amount
       this.showCoupon=false
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
    position: absolute;
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
</style>
