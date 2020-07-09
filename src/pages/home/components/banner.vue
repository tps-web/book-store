<template>
  <div class="banner">
       <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
             <van-swipe-item>1</van-swipe-item>
             <van-swipe-item>2</van-swipe-item>
             <van-swipe-item>3</van-swipe-item>
             <van-swipe-item>4</van-swipe-item> 
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
  width: 96%;
  margin:50px auto 0;
  border-radius: 6px; 
}
.van-swipe__track{
  border-radius: 6px; 
}
 .my-swipe .van-swipe-item {
    border-radius: 6px; 
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
 }
</style>
