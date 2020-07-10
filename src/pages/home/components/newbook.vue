<template>
  <div class="">
    <div class="title">
    	<span class="tit_left">新书上架</span>
    	<span class="tit_move" @click="goMove">更多</span>
    </div>
    <van-grid :border="false" :column-num="3" style="font-size: 12px">
     <van-grid-item v-for="(item,index) in 3" :key="index" to="/category" >
        <van-image src="https://huisn-1253895285.cos.ap-guangzhou.myqcloud.com/resourcePlus/XiaoYaZiXueYouYong/1584007352918_0.jpg"  radius="6px" />
        <span class="name">长着驴耳朵的国王</span>
        <span class="desc">#习惯养成、0-3岁</span>
     </van-grid-item>
   </van-grid>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  methods:{
  	goMove(){
       this.$router.push('/move')
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
.title{
	width: 92%;
	margin: 6px auto 0; 
	display: flex;
	justify-content: space-between;
}
.tit_left{
  font-size: 14px;
  font-weight:600;
}
.tit_move{
	font-size: 12px;
	color:rgba(153,153,153,1);
}
.name{
	margin:4px 0;
}
.desc{
	font-size: 10px;
	color:rgba(153,153,153,1);
	margin-top: 2px;
	text-align: left;
}
</style>
