<template>
  <div class="content">
    <van-grid :column-num="2" :border="false">
      <van-grid-item v-for="(item,index) in listItem" :key="index" class="grid_item">
        <div class="imgBox">
           <van-image :src="item.squareImage" radius="6px"  @click="goToGoodsDetail(item)" class="img"/>
        </div>
         <div class="storeName">{{item.title}}</div>
         <div class="category" v-if="item.categoryName&&item.categoryName.length>0">
         	<div v-for="(type,index) in item.categoryName.slice(0,2)" :key="index" :style="{background:color[index].bg}" class="one">
             <span style="color:#000; opacity: 1">{{type}}</span></div>
         </div>
         <div style="height:23px" v-else>
         </div>
         <div class="price">
           <div class="left">
              <div style="display:inline-block" v-show="item.promotionAmount"><span>￥</span><span class="num">{{item.promotionAmount|decimals}}</span></div>
               <div :class="[item.promotionAmount?'show_decoration':'noshow']">
                 <span>￥{{item.price|decimals}}</span>
             </div>
           </div>
           <div class="right">
              <van-image :src="require('../../assets/images/homeCart.png')" class="cart_img" @click="goCart(item)"/>
           </div>
         </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import {mapMutations,mapActions} from 'vuex'
export default {
  inject: ["reload"], //注入reload方法
  props:{
    listItem:{
      type:Array,
    }
  },
  data () {
    return {
      color:[{bg:'#EDE9E0'},{bg:'rgba(255,205,1,1)'}],
      cateType:[]
    }
  },
  created(){
    // console.log(this.listItem)
  },
  methods:{
    goToGoodsDetail(item){
          this.$router.push(`/goodsDetails/${item.id}`)
        //   this.$router.replace({
        //       path:`/goodsDetails/${item.id}`
        //   },()=>{
        //      this.reload(); //此处刷新页面
        //     // window.location.reload()
        //     // this.$router.go(0)
        //   })
    },
    //  ...mapMutations(['ADD_TO_CART']),
     ...mapActions(['addCart']),
    goCart(item){
      // console.log(item)
      if(item.total-item.remainder>0){
        //有剩余
          this.addCart(item)
      }else{
        this.$toast('库存不足')
      }
      //  this.ADD_TO_CART(item);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
  width: 97%;
  margin: 0 auto;
  /* padding-bottom: 50px; */
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
  margin-top: 4px;
  padding: 6px;
  width: 94%;
  height: 18px;
  line-height: 18px;
  font-size: 12px;
  text-align: left;
  color: rgba(252,86,80,1);
  display: flex;
  justify-content: space-between;
}
.imgBox{
    display:-webkit-flex;
    display:flex;
    -webkit-flex-flow : column nowrap;
    flex-flow : column nowrap;
    /* background-color:#eee; */
    width: 100%;
    height: 200px;
}
.img{
    width: 100%;
    margin-left : auto;
    margin-right : auto;
    margin: auto;
}
.cart_img{
  width: 18px;
  height: 18px;
}
.num{ 
  font-size: 16px;
}
.grid_item{
  margin: 4px 0;
}
/deep/ .van-grid-item__content{
  box-shadow: 0 0 4px 0  rgba(0,0,0,0.1);
  padding: 0px 4px;
  margin: 4px;
  border-radius: 4px;
}
.show_decoration{
  color: #ccc;
  font-size: 10px!important;
  display:inline-block;
  text-decoration:line-through;
}
.noshow{
  font-size: 14px;
}
</style>
