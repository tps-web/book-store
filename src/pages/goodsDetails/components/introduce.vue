<template>
  <div class="content">
    <div class="title">商品简介</div>
    <div class="desc">
      {{introduction}}
    </div>
    <van-image src="https://huisn-1253895285.cos.ap-guangzhou.myqcloud.com/resourcePlus/HuJiaHuWei/1591174173759_1.jpg" />
  </div>
</template>

<script>

export default {
  props:{
    introduction:{
      type:String,
    }
  },
  data () {
    return {
    }
  },
  created(){
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
	width: 94%; 
	margin: 0 auto;
}
.title{
	font-size:14px;
    color:rgba(34,34,34,1);
    font-weight:600;
    text-align: left;
}
.desc{
	margin: 10px 0;
	text-align:left;
    font-size:12px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(34,34,34,1);
}
</style>
