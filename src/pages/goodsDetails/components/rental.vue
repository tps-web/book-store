<template>
  <div class="">
       <div class="top"  style="margin: 20px auto 10px">
       	 <div class="tit">租赁流程</div>
       	 <div class="more" @click="goMore">更多</div>
       </div>
       <div class="bigBox" @click="goMore">
       	 <div class="box" >
       	 	  <van-image  width="36"  :src="require('../../../assets/images/xzsp.png')" />
       	 	  <div class="boxText">选择商品</div>
       	 </div>
       	  <div class="box">
       	 	  <van-image class="boxImg"  :src="require('../../../assets/images/zfzyj.png')" />
       	 	  <div class="boxText">提交订单</div>
       	 </div>
       	  <div class="box">
       	 	  <van-image class="boxImg" :src="require('../../../assets/images/shty.png')" />
       	 	  <div class="boxText">收货体验</div>
       	 </div>
       	  <div class="box">
       	 	  <van-image class="boxImg"  :src="require('../../../assets/images/yygh.png')" />
       	 	  <div class="boxText">预约归还</div>
       	 </div>
       </div>
        <div class="top"  style="margin: 20px auto 10px">
       	 <div class="tit">归还须知</div>
       	 <div class="more"  @click="goMore">更多</div>
       </div>
       <div class="bigBox" @click="goMore">
        <div class="box" >
       	 	  <van-image class="boxImg"  :src="require('../../../assets/images/yykd.png')" />
       	 	  <div class="boxText">预约快递</div>
       	 </div>
       	  <div class="box">
       	 	  <van-image class="boxImg" :src="require('../../../assets/images/mfqj.png')" />
       	 	  <div class="boxText">免费取件</div>
       	 </div>
       	  <div class="box">
       	 	  <van-image width="32"  :src="require('../../../assets/images/ckjs.png')" />
       	 	  <div class="boxText">平台确认</div>
       	 </div>
       	  <div class="box">
       	 	  <van-image class="boxImg" :src="require('../../../assets/images/ddwc.png')" />
       	 	  <div class="boxText">订单完成</div>
       	 </div>
       	</div>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  methods:{
  	goMore(){
	  this.$router.push(`/rule`)
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top{
	width: 94%;
    margin: 0 auto;
	display: flex;
	justify-content:space-between;
}
.tit{
	font-size:14px;
    color:rgba(34,34,34,1);
    font-weight:600;
}
.more{
	font-size:12px;
	font-weight:400;
    color:rgba(153,153,153,1);
}
.bigBox{
	width: 92%;
	background:rgba(245,245,245,1);
    border-radius:8px;
	margin: 6px auto;
	padding: 8px 6px;
	display: flex;
	justify-content: space-between;
	flex-wrap:wrap;
}
.box{
   font-weight:400;
	width: 22%;
	margin: 6px 0;
}
.boxImg{
	width: 32px;
	height: 32px;
}
.boxText{
	font-size: 12px;
	margin-top: 2px;
	text-align: center;
}
</style>
