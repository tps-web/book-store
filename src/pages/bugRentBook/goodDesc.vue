<template>
  <div class="">
      <!-- 商品列表-->
       <div class="box" v-for="(item,index) in this.$route.query.goodsList" :key="index" @click="godesc(item.id)">
        <div class="imgBox">
          <img class="boxImg" :src="item.squareImage" alt="">
        </div>
          <div class="boxDesc">
             <div class="tit">{{item.title}}</div>
             <div style="color:red;margin-top:4px">￥{{item.price}}</div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
   computed:{
     //商品总数
  },
  created(){
  },
  methods:{
      godesc(id){
          this.$router.replace(`/goodsDetails/${id}`)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
  width: 94%;
  margin: 6px auto;
  border-radius: 6px;
  padding: 6px 4px;
  display: flex;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
}
.boxDesc{
  margin-left: 10px;
  text-align: left;
}
.imgBox{
  width: 78px;
  height: 88px;
  display:-webkit-flex;
  display:flex;
  -webkit-flex-flow : column nowrap;
  flex-flow : column nowrap;
}
.boxImg{
   width: 100%;
    /* height: 170px; */
    margin-left : auto;
    margin-right : auto;
    margin: auto;
}
</style>
