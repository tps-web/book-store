<template>
  <div class="banner">
       <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
             <van-swipe-item  v-for="(item,index) in bannerList" :key="index" @click="gourl(item)">
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
  },
  methods:{
    gourl(item){
      // console.log(item)
      if(item.targetType==0){
        //故事
        this.$router.push(`/goodsDetails/${item.target}`)
      }else{
        //活动
      }
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
