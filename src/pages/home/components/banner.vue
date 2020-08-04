<template>
  <div class="banner">
       <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
             <van-swipe-item  v-for="(item,index) in bannerList" :key="index">
                 <van-image width="96%" radius="6px" :src="item.imageUrl"/>
             </van-swipe-item>
       </van-swipe>
  </div>
</template>

<script>

export default {
   props:{
    bannerItem:{
       type:Object
    }
  },
  data () {
    return {
      bannerList:[]
    }
  },
  created(){
    this.bannerList=this.bannerItem.data
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
