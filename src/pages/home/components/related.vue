<template>
  <div class="content">
   <headline headline="猜你喜欢" class="tit"/>
     <goodsItem :listItem="listItem" />
    <!-- <van-grid :column-num="2" :border="false">
      <van-grid-item v-for="(item,index) in listItem.data" :key="index" class="grid_item">
         <van-image :src="item.squareImage" radius="6px"  @click="goToGoodsDetail(item)" class="img"/>
         <div class="storeName">{{item.title}}</div>
         <div class="category" >
         	<div v-for="(type,index) in item.categoryName" :key="index" :style="{background:color[index].bg}" class="one">
             <span style="color:#000; opacity: 1">{{type}}</span></div>
         </div>
         <div class="price">
           <div class="left">
              <span>￥</span><span class="num">{{item.price}}</span>
           </div>
           <div class="right">
              <van-image :src="require('../../../assets/images/homeCart.png')" class="cart_img" @click="goCart(item)"/>
           </div>
         </div>
      </van-grid-item>
    </van-grid> -->
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
// import  goodsItem from './goods'
import  goodsItem from '@/components/RgoodsItem'


export default {
  components:{
    goodsItem
  },
  props:['listItem'],
  // props:{
  //   listItem:{
  //     type:Object,
  //   }
  // },
  data () {
    return {
    	color:[{bg:'rgba(0,114,255,1)'},{bg:'rgba(255,205,1,1)'}]
    }
  },
  created(){
  },
  methods:{
    goToGoodsDetail(item){
          this.$router.push(`/goodsDetails/${item.id}`)
          // this.$router.push({
          //   name: "goodsDetails",
          //   query: {
          //     id: item.id}
          // })
    },
    //  ...mapMutations(['ADD_TO_CART']),
    goCart(item){
      //  this.ADD_TO_CART(item);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tit{
  margin-bottom: 4px;
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
.img{
  width: 150px;
  height: 200px;
}
.cart_img{
  width: 18px;
  height: 18px;
}
.num{
  font-size: 16px;
}
</style>
