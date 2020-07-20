<template>
  <div class="">
    <div class="bg">
        <div class="success_img">
            <van-image :src="require('../../assets/images/success.png')"  class="succ_img"/>
          <div class="text">
            <div class="success_text">支付成功！</div>
            <div>感谢您的购买</div>
          </div>
        </div>
        
    </div>
    <div class="box">
         <van-image :src="require('../../assets/images/xian.png')" class="xian" />
         <div class="pay_box">
             <div class="pay"><span>￥</span><span class="payNum">{{clearedNum}}</span></div>
             <div class="desc">
                <div class="payId">订单编号：082546908245</div>
                <div class="date">下单时间：2020-07-09 12:4</div>
                <div class="payWay">支付方式：微信支付</div>
             </div>
         </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed:{
    ...mapGetters({clearedNum:'CLEARED_NUM'}),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg{
    width: 100%;
    height: 240px;
    background:rgba(4,198,123,1);
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
</style>
