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
          <!-- <div v-else style="height:24px"></div> -->
         <div class="price">
            <div class="left">
              <div style="display:inline-block" :class="[item.memberPrice||item.promotionAmount?'':'only']">
                <span>￥</span><span class="num">{{item.promotionAmount||item.price|decimals}}</span>
              </div>
               <!-- <div :class="[item.promotionAmount?'show_decoration':'noshow']" v-show="!item.memberPrice&&item.promotionAmount"> -->
               <div class="show_decoration" v-show="!item.memberPrice&&item.promotionAmount">
                 <span>￥{{item.price|decimals}}</span>
               </div>
               <!-- <div v-if="item.memberPrice" ><span style="color:#000;">￥{{item.memberPrice|decimals}}</span><span class="merberTit">会员价</span></div> -->
               <div v-if="item.memberPrice"><span class="merberTit">会员价￥{{item.memberPrice|decimals}}</span></div>
           </div>
           <div class="right"> 
              <!-- <van-image :src="require('../assets/images/homeCart.png')" class="cart_img" @click="goCart(item)"/> -->
              <div class="btn" style="background:#000;color:#ff1" @click="goCart(item)">租借</div>
              <div class="btn" style=" background: #FFC01C;color:red" @click="goCart(item)">购买</div>
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
    },
    //  ...mapMutations(['ADD_TO_CART']),
     ...mapActions(['addCart']),
    goCart(item){
      if(item.total-item.remainder>0){
         this.addCart(item);
       }else{
        this.$toast('库存不足')
       }
    
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
  width: 97%;
  margin: 0 auto;
  /* padding-bottom: 20px; */
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
   /* height: 200px; */
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
.show_decoration{
  color: #ccc;
  font-size: 12px!important;
  text-decoration:line-through;
  margin-left: 8 px;
  margin-top: 2px;
}
.noshow{
  margin-top: 8px;
  font-size: 14px; 
}
.price{
  margin-top: 4px;
  padding: 8px 6px;
  width: 100%;
  /* height: 24px; */
  font-size: 12px;
  text-align: left;
  color: rgba(252,86,80,1);
  display: flex;
  justify-content: space-between;
  position: relative;
}
.left{
  width: 50%;
  margin-top: 6px;
}
.right{
  position: absolute;
  bottom: 8px;
  right: 3px;
}
.btn{
  display: inline-block;
  color: #000;
  padding: 3px 5px;
  text-align: center;
  border-radius: 4px;
  margin-top: 8px;
  /* margin-right: 3px; */
}
.merberTit{
  background: #000;
  border-radius: 6px;
  padding: 3px;
  color: rgb(255, 255, 17);
  font-size: 10px;
  display:inline-block;
  margin-top: 3px;
}
/deep/ .van-grid-item__content{
  box-shadow: 0 0 4px 0 rgba(0,0,0,0.1);
  margin: 2px 2px;
  border-radius: 4px;
}
.only{
  margin-top: 12px;
}
</style>
