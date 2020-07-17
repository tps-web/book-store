<template>
  <div class="">
      <!-- 商品列表-->
       <div class="goods">
         <div class="bigBox">
           <div class="box" v-for="(item,index) in goods" :key="index" @click='goDetails(item)'>
             <van-image class="goodsImg" :src="item.smallImage" radius="6px" style="box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);"/>
           </div>
         </div>
          <div class="goods_right">
            共{{totalNum}}件商品<van-icon name="arrow" class="right_icon" />
          </div>
       </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
    }
  },
   computed:{
    ...mapGetters({goods:'SELECTED_GOODS',clearedNum:'CLEARED_NUM'}),
     //商品总数
    totalNum(){
      return this.goods.length 
    },
  },
  methods:{
      goDetails(item){
          console.log(item)
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
