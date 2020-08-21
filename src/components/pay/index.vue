<template>
  <div>
    <van-dialog v-model="show" title="支付订单" confirmButtonText="去支付"  @confirm="confirm()" :before-close="onBeforeClose">
      <van-icon name="close" size="24" class="close" @click="closeBtn"/>
         <div class="payNum">￥{{payAmount}}</div>
         <van-radio-group v-model="radionum" class="radioBox">
            <van-radio  name="2"  class="payBtn">
                <van-image :src="require('../../assets/images/wxpay.png')" class="payImg"/>
                <span class="payText">微信支付</span>
            </van-radio>
            <!-- <van-radio name="1"  class="payBtn">
              <van-image :src="require('../../assets/images/zfbpay.png')" class="payImg"/>
                <span class="payText">支付宝支付</span>
            </van-radio> -->
         </van-radio-group>
     </van-dialog>
  </div>
</template>

<script>
var that
export default {
  props:['show','payAmount'],
  data () {
    return {
        radionum:'2'
    }
  },
  created(){
 
  },
  methods:{
    onBeforeClose(action, done){
       if (action === "confirm") {
        return done(false);
       }else{
         return done();
         this.radio=2
       }
    },
    confirm(){
       this.$emit('confirmData')
    },
    closeBtn(){
       this.$emit('closepop')
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pay{
  height: 32px;
  line-height: 32px;
  padding: 0 4px;
  color: #FC5650;
  border-radius: 14px;
}
.radioBox{
  width: 96%;
  margin: 0px auto;
  position: relative;
}
.payNum{
  width: 100%;
  margin: 6px 0;
  height: 40px;
  line-height: 40px;
  color: #3080AA;
  font-size: 24px;
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
  /* padding: 4px; */
  background: #f5f5f5;
  margin: 4px auto;
  margin-bottom: 20px;
  border-radius: 6px;
}
.close{
  position:absolute;
  right: 20px;
  top: 20px;
}

/deep/ .van-radio__icon{
    position: absolute!important;
    right: 10px!important;
}
</style>
