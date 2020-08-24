<template>
  <div class="content">
      <headline headline="商品推荐" class="tit"/>
      <goodsItem  :list="6" :listItem="recommendlist" />
  </div>
</template>

<script>

export default {
   props:{
    recommendlist:{
       type:Array
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
  margin-top: 20px;
}
.tit{
  margin-bottom: 10px;
}
</style>
