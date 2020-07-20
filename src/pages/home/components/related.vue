<template>
  <div class="content">
   <headline headline="猜你喜欢" />
    <van-grid :column-num="2" :border="false">
      <van-grid-item v-for="(item,index) in bookList" :key="index" class="grid_item">
         <van-image :src="item.squareImage" radius="6px"  @click="goToGoodsDetail(item)" />
         <div class="storeName">{{item.storyName}}</div>
         <div class="category" >
         	<div v-for="(item,index) in 2" :key="index" :style="{background:color[index].bg}" class="one">
             <span style="color:#000; opacity: 1">0-3岁</span></div>
         </div>
         <div class="price">
           <div class="left">
              <span>￥</span><span class="num">19.90</span>
           </div>
           <div class="right">
              <van-image :src="require('../../../assets/images/homeCart.png')" class="cart_img" @click="goCart(item)"/>
           </div>
         </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  props:{
    bookList:{
      type:Array,
    }
  },
  data () {
    return {
    	color:[{bg:'rgba(0,114,255,1)'},{bg:'rgba(255,205,1,1)'}]
    }
  },
  created(){
  },
  methods:{
    goToGoodsDetail(item){
        // console.log(item)
          this.$router.push({
            name: "goodsDetails",
            query: {
              id: item.sid,
              storyName:item.storyName,
              bgImage:item.squareImage,
              images: item.images,
              storyCategoryName:item.storyCategoryName,
              price:item.price,
              introduction:item.introduction
          }
        })
    },
     ...mapMutations(['ADD_TO_CART']),
    goCart(item){
      let op = {
              id: item.sid,
              storyName:item.storyName,
              bgImage:item.squareImage,
              images: item.images,
              storyCategoryName:item.storyCategoryName,
              price:item.price,
              introduction:item.introduction
          }
        this.ADD_TO_CART(op);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
  margin-top: 20px;
}
.storeName{
	width: 100%;
  text-align: left;
  margin-left: 8px;
	padding: 6px 8px;
}
.category{
	width: 100%; 
	font-size: 10px;
	display: flex;
}
.one{
	opacity:0.7;
	padding:3px;
	border-radius: 4px;
	margin:0 4px;
}
.price{
  padding: 6px;
  width: 96%;
  height: 18px;
  line-height: 18px;
  font-size: 12px;
  text-align: left;
  color: rgba(252,86,80,1);
  display: flex;
  justify-content: space-between;
}
.cart_img{
  width: 18px;
  height: 18px;
}
.num{
  font-size: 16px;
}
/* .grid_item{
  box-shadow:0px 0px 4px 0px rgba(0,0,0,0.1);
} */
/* /deep/ .van-grid-item__content{
  padding: 0 !important;
  margin: 6px 4px;
} */
</style>
