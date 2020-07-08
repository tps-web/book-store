<template>
  <div class="content">
    <div class="header">
        <van-icon name="arrow-left" size="30" class="icon_back"/>
        <div class="search" @click="()=>{this.$router.push('/search')}"><span class="placeholder"><van-icon name="search" style="top: 2px;margin-right: 6px;" />搜索喜爱的书籍</span></div>
    </div>
       <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
             <van-swipe-item>1</van-swipe-item>
             <van-swipe-item>2</van-swipe-item>
             <van-swipe-item>3</van-swipe-item>
             <van-swipe-item>4</van-swipe-item> 
       </van-swipe>
    <navigate/>
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
  padding: 6px;
  display: flex;
  justify-content:flex-start;
}
.icon_back{
  width: 10%;
  height: 32px;
  line-height: 32px;
  text-align: center;
}
.search{
  width: 86%;
  margin: 0 auto; 
  height: 32px;
  /*padding: 2px;*/
  background:rgba(239,239,239,1);
  border-radius:32px;
}
.placeholder{
  height: 30px;
  line-height: 30px;
  color:rgba(170,170,170,1);
  font-weight:400;
}
 .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
</style>
