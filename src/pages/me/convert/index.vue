<template>
  <div class="content">
     <!-- <headerNav title="兑换中心"/> -->
      <div class="box"> 
      	     <div style="width: 70%;margin: 0 auto;">
      	     	<div class="smBox">
      	     		  <van-field
      	     		   class="inp"
                  v-model="code"
                  placeholder="请输入领劵码兑换"
                  :rules="[{ required: true, message: '请输入领劵码兑换' }]"
                       />
                </div>
      	     </div>
      </div>
     <div class="convent" @click="onConvent">兑换</div>
     <div class="btn" @click="goConpon">查看优惠券</div>
  </div>
</template>

<script>
import {getCouponByCode} from '@/api'
export default { 
  data () {
    return {
    	code:""
    }
  },
  methods:{
    goConpon(){
      this.$router.push(`/coupon`)
    },
  	onConvent(){
      if(!this.code){
        this.$toast('请输入领劵码')
      }else{
         getCouponByCode(this.code).then(res=>{
           this.$toast('兑换成功！')
           this.code=""
          // this.$dialog.alert({
          //           message: "兑换成功！查看优惠券", //改变弹出框的内容
          //           showCancelButton: true //展示取水按钮
          //       })
          //       .then(() => { //点击确认按钮后的调用
                    
          //       })
          //       .catch(() => { //点击取消按钮后的调用
          //           // console.log("点击了取消按钮")
          //       })
         })
      }
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
	width: 100%;
  overflow: hidden;
}
.box { position: relative; width: 100%; height: 160px; text-align: center; line-height: 50px;}
.box:after { width: 120%; height: 160px; position: absolute; left: -10%; top: 0; z-index: -2; content: ''; border-radius: 0 0 100% 100%;
 background: linear-gradient(#2CBAF9, #04A9F4);  
 /*background:#8C63A5;*/
   /*background:linear-gradient(180deg,rgba(49,49,49,1) 0%,rgba(15,15,15,1) 100%);*/
   }
.smBox{
	position: relative;
	top: 42px;
	width: 100%;
	height:150px;
	margin: 0 auto;
	overflow: hidden;
	border-radius: 10px 10px 0 0;
	z-index: 2
}
.smBox:after{
   width: 140%; height: 120px; position: absolute; left: -10%; top: 0; z-index: -1; content: ''; border-radius: 0 0 60% 36%;
   background-color: rgba(255,205,1,1);
}
.inp{
	width: 90%;
	margin: 40px auto;
	border-radius:22px;
}
.convent{
	width: 80%;
	margin: 50px auto;
  border-radius: 50px;
  height: 44px;
  line-height: 44px;
  background: rgba(255,205,1,1);
  font-weight: 500;
  color: rgba(34,34,34,1);
  font-size: 16px;
  font-weight:600;
}
.btn{
  width: 100%;
  height: 45px;
  line-height: 45px;
  position: absolute;
  bottom: 0;
  background: rgba(255,205,1,1)
  }
</style>


