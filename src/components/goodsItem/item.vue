<template>
  <div class="">
    <van-grid :border="false" :column-num="2" style="font-size: 12px">
      <van-grid-item v-for="(item,index) in list" :key="index" to="" >
        <van-image src="https://huisn-1253895285.cos.ap-guangzhou.myqcloud.com/resourcePlus/XiaoYaZiXueYouYong/1584007352918_0.jpg"  radius="6px" />
        <span class="name">长着驴耳朵的国王</span>
        <span class="desc">#习惯养成、0-3岁</span>
     </van-grid-item>
   </van-grid>
  </div>
</template>

<script>

export default {
   props:{
       list:Number, 
   },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
