<template>
      <div class="header">
        <!-- <van-icon name="arrow-left" size="30" class="icon_back"/> -->
        <div class="search" @click="()=>{this.$router.push('/search')}"><span class="placeholder"><van-icon name="search" style="top: 2px;margin-right: 6px;" />搜索喜爱的书籍</span></div>
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
.header{
  position: fixed;
  left: 0;
  top: 0;
  padding: 6px;
  width: 98%;
  z-index: 2;
  display: flex;
  justify-content:flex-start;
  background:#fff;
}
.icon_back{
  width: 10%;
  height: 32px;
  line-height: 32px;
  text-align: center;
}
.search{
  width: 96%;
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
</style>
