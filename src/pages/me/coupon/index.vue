<template>
  <div class="">
     <headerNav title="优惠券"/>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="box">
        <van-image  :src="require('../../../assets/images/bg-use.png')" />
        <div class="pos">
        <div class="content">
        	<div class="num">
               ￥<span class="useNum">39</span>
        	</div>
        	<div class="boxNum">
        	 <div class="canNum">
               <div class="bg_fill">满49.0元使用</div>
               <div>仅限单次下单使用</div>
        	 </div>
        	</div>
        	<div class="useBtn">
        		<div class="btn_content"><span class="use_font">立即<br/>使用</span></div>
        	</div>
        </div>
        </div>
      </div>
      <div class="box">
        <van-image  :src="require('../../../assets/images/bg-used.png')" />
        <div class="pos">
          <div class="invalid_content">
        	<div class="invalid_num">
               ￥<span class="useNum">39</span>
        	</div>
        	<div class="boxNum">
        	 <div class="canNum">
               <div class="invalid_bg_fill">满49.0元使用</div>
               <div>仅限单次下单使用</div>
        	 </div>
            </div>
        	<div class="useBtn">
        		<div class="invalid_btn_content"><span class="used_font">已过期</span></div>
        	</div>
        </div>
    </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>

export default { 
  data () {
    return {
    	isLoading:false

    }
  },
  methods:{
    onRefresh(){
      setTimeout(() => {
       this.$toast('刷新成功')
        this.isLoading = false;
      }, 1000);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
	position: relative;
}
.pos{
	width: 90%;
    position: absolute;
	top: 30px;
	left: 30px;
}
.content{
	display: flex;
  	color: rgba(255,0,85,1);
}
.num{
	width: 30%;
	font-size: 12px;
}
.useNum{
   font-size: 70px;
}
.boxNum{
	width: 45%;
}
.canNum{
	width: 65%;
	margin-top: 26px;
	font-size: 10px;
    text-align: center;
}
.bg_fill{
	color:#fff;
	padding: 2px;
	background-color:  rgba(255,0,85,1);
	box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);
    border-radius:20px;
    margin-bottom: 4px;
    font-weight:500;
}
.useBtn{
	width:70px;
    height:70px;
    background:rgba(245,245,245,1);
    border-radius: 50%;
    box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);
}
.btn_content{
	width: 60px;
	height: 60px;
	margin: 3px auto;
	border-radius: 50%;
	font-size: 16px;
	border: 2px solid  rgba(255,0,85,1);
	text-align: center;
}
.use_font{
  font-weight:600;
  position: relative;
  top: 10px;
}
.invalid_content{
	display: flex;
  	color: rgba(221,221,221,1);
}
.invalid_num{
	width: 30%;
	font-size: 12px;
}
.invalid_bg_fill{
    color:#fff;
	padding: 2px;
	background-color:  rgba(221,221,221,1);
	box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);
    border-radius:20px;
    margin-bottom: 4px;
    font-weight:500;
}
.invalid_btn_content{
	width: 60px;
	height:60px;
	margin: 3px auto;
	border-radius: 50%;
	border: 2px solid  rgba(221,221,221,1);
	text-align: center;
}
.used_font{
  font-weight:600;
  position: relative;
  top: 20px;
}
</style>
