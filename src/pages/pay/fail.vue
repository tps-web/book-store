<template>
  <div class="page">
    <div class="bg">
        <div class="success_img">
            <van-image :src="require('../../assets/images/fail.png')"  class="succ_img"/>
          <div class="text">
            <div class="success_text">支付失败！</div>
            <div>请重新支付</div>
          </div>
        </div>
    </div>
    <div class="box">
         <van-image :src="require('../../assets/images/fail_xian.png')" class="xian" />
         <div class="pay_box">
             <div class="pay"><span>￥</span><span class="payNum">{{item.payAmount}}</span></div>
             <div class="desc">
                <div class="payId">订单编号：{{item.orderSn}}</div>
                <div class="date">下单时间：{{item.createTime}}</div>
                <div class="payWay">支付方式：{{item.payType|payWay}}</div>
             </div>
         </div>
    </div>
    <div class="btn">
          <van-button type="default" @click="goOrder">查看订单</van-button>
          <van-button type="default" style="margin-left:30px" @click="goHome">返回首页</van-button>
    </div>
  </div>
</template>

<script>
import {getOrderDesc} from '@/api'
export default {
  data () {
    return {
      id:this.$route.query.id,
      item:''
    }
  },
   created(){
     getOrderDesc(this.$route.query.id).then(res=>{
        console.log(res.data.item)
        this.item=res.data.item
     })
   },
   methods:{
    goHome(){
      this.$router.push(`/`)
     },
     goOrder(){
      this.$router.push(`/orderDetails/${sessionStorage.getItem('orderId')}`)
     }
   },
   filters:{
     payWay(payType){
       if(payType==2){
         return '微信支付'
       }else if(payType==1){
         return '支付宝支付'
       }
     }
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg{
    width: 100%;
    height: 240px;
    background:rgba(252,86,80,1);;
}
.success_img{   
    position: absolute;
    top: 84px;
    left: 84px;
    display:flex;
}
.succ_img{
    width: 64px;
    height: 64px;
}
.box{
  width: 96%;
  margin: -40px auto 0; 
}
.text{
    color: #fff;
    text-align: left;
    margin-left: 12px;
    margin-top: 8px;
}
.success_text{
    font-size: 20px;
    margin-bottom: 2px;
}
.pay_box{
    width: 92%;
    margin: -6px auto 0;
    height: 200px;
    background: #fff;
    box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);
    border: 1px solid #f5f5f5;
}
.pay{
  margin-top: 20px;
  font-weight: 700;
  font-size: 24px;
}
.payNum{
    font-size: 48px;
}
.desc{
    width: 90%;
    margin: 20px auto;
    text-align: left;
    font-size: 14px;
}
.date{
    margin: 12px 0;
}
.btn{
  margin: 40px auto;
}
</style>
