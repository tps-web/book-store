<template>
  <div class="">
     <div class="goods">
         <div class="bigBox">
           <div class="box" v-for="(item,index) in goods" :key="index" @click='goDetails(item)'>
             <van-image class="goodsImg" :src="item.smallImage" radius="6px" style="box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);"/>
           </div>
         </div>
          <div class="goods_right" @click="goTotal()">
            共{{totalNum}}件商品<van-icon name="arrow" class="right_icon" />
          </div>
       </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'
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
  created(){
    // console.log(this.goods)
  },
  methods:{
    goDetails(item){
      // console.log(item)
      this.$router.push(`/goodsDetails/${item.id}`)
    },
    goTotal(){
      this.$router.push(`/goodsList`)
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
  /* justify-content: space-between; */
  box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);
  border-radius: 6px;
}
.goods_right{
  position:absolute;
  right: 2px;
  top: 38px;
  /* width: 25%; */
}
.bigBox{
  /* width: 270px; */
  width: 75%;
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
