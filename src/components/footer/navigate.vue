<template>
    <div class="footer">
       <van-tabbar route >
         <van-tabbar-item   icon="wap-home-o" to="/" >主页</van-tabbar-item>
         <van-tabbar-item   icon="wap-nav"  to="/category" >分类</van-tabbar-item>
         <van-tabbar-item   icon="shopping-cart-o" :badge="goodsNum" to="/cart" >购物车</van-tabbar-item>
         <van-tabbar-item   icon="user-o" to="/me" >我的</van-tabbar-item>
       </van-tabbar>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name:'navigate',
    computed:{
      ...mapState(['shopCart']),
      goodsNum(){
      let num = Object.keys(this.shopCart).length
      if(num>=1){
        return num
      }
     }
   },
   data(){
     return {
       isRouter:true
     }
   }

} 
</script>
<style type="text/css" scoped>
	.footer{
		margin-bottom: 50px;
	}
  /* .van-tabbar--fixed{
    position: absolute;
    bottom: 0;
  } */
</style>

