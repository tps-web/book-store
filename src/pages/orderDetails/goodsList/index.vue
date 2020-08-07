<template>
  <div class="">
      <!-- 商品列表-->
       <div class="goods" @click='goDetails(goodsList)'>
         <div class="bigBox">
           <div class="box" v-for="(item,index) in goodsList" :key="index" >
             <van-image class="goodsImg" :src="item.bookPic" radius="6px" style="box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);"/>
           </div>
         </div>
          <div class="goods_right">
            共{{goodsList.length}}件商品<van-icon name="arrow" class="right_icon" />
          </div>
       </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  props:['goodsList'],
  data () {
    return {
    }
  },
   computed:{
     //商品总数
  },
  created(){
    // console.log(this.goodsList)
  },
  methods:{
      goDetails(item){
          // console.log(item[0].orderSn)
          this.$router.push(`/orderList/goodsList/${item[0].orderSn}`)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.goods{
  position: relative;
  width: 94%;
  height: 90px;
  margin: 18px auto;
  display: flex;
  padding: 4px;
  box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);
  border-radius: 6px;
}
.goods_right{
  position:absolute;
  right: 10px;
  top: 40px;
}
.bigBox{
  width: 270px;
  overflow-x: auto;
  display: flex;
}
.box{
  width: 75px;
  height: 75px;
  margin: auto 4px;
}
.goodsImg{
   width: 75px;
  height: 75px;
}
.right_icon{
  position: relative;
  top: 2px;
}
</style>
