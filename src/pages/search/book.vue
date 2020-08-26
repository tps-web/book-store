<template>
  <div class="">
       <div class="content_box">
          <div class="store_box" v-for="(item,index) in list" :key="index">
            <van-image class="store_boxImg" radius="4px" :src="item.squareImage" @click="goGoods(item.id)" />
            <div class="store_box_content" @click="goGoods(item.id)">
                <div class="title">{{item.title}}</div>
                <div class="author">作者：{{item.author}}</div>
                <div class="price">
                     <span  class="promotionAmount" v-show="item.promotionAmount">￥{{item.promotionAmount}}</span>
                     <span  :class="[item.promotionAmount==null ? 'periceZ':'priceNumT']" >￥{{item.price}}</span>
                </div>
            </div>
            <div class="store_box_right" @click="goCart(item)">
              <van-image :src="require('../../assets/images/homeCart.png')" class="cart_img"/><span class="font">加入购物车</span>  
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import {mapMutations,mapActions} from 'vuex'
export default {
  props:['list'],
  data () {
    return {
    }
  },
  created(){
    // console.log(this.list)
  },
  methods:{
    // ...mapMutations(['ADD_TO_CART']),
    ...mapActions(['addCart']),
    goCart(item){
      // this.ADD_TO_CART(item);
      this.addCart(item)
    },
    goGoods(id){
      this.$router.push(`/goodsDetails/${id}/1`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content_box{
    width: 94%;
    margin: 0 auto;
    /* position: relative;
    top: -40px; */
}
.store_box{
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 12px auto 10px;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.1);
  padding: 12px 10px;
  border-radius:8px;
}
.store_boxImg{
    width: 70px;
    height: 90px;
}
.store_box_content{
    flex: 6;
    margin-left: 12px;
    text-align: left;
}
.title{
    margin-top: 5px;
}
.author{
    color: #999;
    margin: 10px 0;
}
.price{
    margin: 6px 0;
    color: #FC5650;
}
.fh{
    font-size: 12px;
}
.priceNum{
    font-size: 14px;
}
.promotionAmount{
  font-size: 16px;
}
.store_box_right{
    flex: 4;
    margin: auto 0;
    color: #999;
    font-size: 10px;
}
.cart_img{
    width: 20px;
    height: 20px;
}
.font{
    position: relative;
    top: -5px;
    left: 4px;
    display: inline-block;
    height: 28px;
    line-height: 28px;
}
.periceZ{
  display: inline-block;
  color: red;
  height: 35px;
  line-height: 40px;
  font-size: 14px;
}
.priceNumT{
  display: inline-block;
  height: 35px;
  line-height: 40px;
  font-size: 14px;
  color: #ccc;
  text-decoration:line-through
}
</style>


   