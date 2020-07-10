<template>
  <div class="banner">
       <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
             <van-swipe-item  v-for="(item,index) in 4" :key="index">
               <van-image width="96%" radius="6px" src="https://huisn-1253895285.cos.ap-guangzhou.myqcloud.com/resourcePlus/HuJiaHuWei/1591174173759_2.jpg" />
             </van-swipe-item>
       </van-swipe>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.banner{	
  width: 100%;
  margin:50px auto 0;
  border-radius: 6px; 
}
</style>
