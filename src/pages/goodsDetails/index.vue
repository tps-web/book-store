<template>
  <div class="content">
     <!-- <headerNav title="商品详情"/> -->
      <!-- 商品轮播 -->
     <van-swipe @change="onChange">
       <van-swipe-item v-for="(item,index) in goodsInfo.images" :key="index">
       	<van-image width="96%" radius="6px" :src="item" />
       </van-swipe-item>
       <template #indicator>
         <div class="custom-indicator">
         {{ current + 1 }}/{{goodsInfo.images.length}}
       </div>
     </template>
    </van-swipe>
    <!-- 商品信息 -->
    <div class="price">
      <div class="priceNum">￥{{goodsInfo.price}}</div>
      <div class="vip">会员免费借书看</div>
    </div>
    <div class="bookName">
        {{goodsInfo.storyName}}
    </div>
    <div class="storeDesc">
      <div class="desc">
    	<div class="box" v-for="(item,index) in 4" :key="index">
    		习惯养成
    	</div>
      </div>
      <div class="book_press">
      	<div class="author">作者:韦达大师</div>
      	<div class="press">出版社：中山韦达技术出版社</div>
      </div>
      <Vip />
      <!-- 租赁流程  归还流程-->
       <Rental/>
       <!-- 简介 -->
       <Introduce  :introduction="goodsInfo.introduction"/>
       <!-- 评论 -->
       <Comment/>
       <!-- 推荐 -->
       <div class="pad">
          <Recommend/>
       </div>
    </div>
   <van-goods-action>
      <van-goods-action-icon icon="cart-o" :badge="goodsNum" text="购物车" @click="onClickIcon" />
      <van-goods-action-button
      type="warning"
      text="加入购物车"
      @click="onClickButton"
      />
</van-goods-action>
  </div>
</template>

<script>
import Rental from './components/rental.vue'
import Introduce from './components/introduce.vue'
import Comment from './components/comment.vue'
import Recommend from './components/recommend.vue'
import Vip from './components/vip.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  components:{
  	Rental,
  	Introduce,
    Comment,
    Recommend,
    Vip
  },
  data () {
    return {
       current: 0,
       goodsInfo: this.$route.query,
    }
  },
  computed:{
    ...mapState(['shopCart']),
    goodsNum(){
      let num = Object.keys(this.shopCart).length
      if(num>=1){
        return num
      }
    }
  },
  created(){
    // console.log(this.$route.query.introduction)
  },
   methods: {
     ...mapMutations(['ADD_TO_CART']),
    onChange(index) {
      this.current = index;
    },
    onClickIcon(){
      this.$router.push('/cart')
    },
    //加入购物车
    onClickButton(){
      this.$toast('加入购物车')
      this.ADD_TO_CART(this.goodsInfo);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.custom-indicator {
    position: absolute;
    right: 8px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: #ff1;
    color: #000;
    border-radius: 6px;
}
.bookName{
	width: 94%;
	font-size: 17px;
	color:rgba(34,34,34,1);
	font-weight:500;
    margin:10px 12px;
	text-align: left;
}
.desc{
	width: 94%; 
	margin:0 auto;
	display: flex;
	font-size: 10px;
}
.box{
	margin-right:10px;
    background:rgba(245,245,245,1);
    color:rgba(153,153,153,1);
    border-radius:10px;
    padding: 6px;
}
.book_press{
	width: 91%;
	margin:14px auto;
	font-size: 12px;
	text-align: left;
}
.press{
	margin-top: 8px;
}
.pad{
  margin-bottom: 50px;
}
.price{
  width: 94%; 
	margin:0 auto;
  text-align: left;
  display: flex;
}
.priceNum{
  padding: 4px 0 0;
  color:rgba(252,86,80,1);
  font-size: 24px;
}
.vip{
  margin-left: 6px;
  height: 30px;
  line-height: 40px;
  color:rgba(153,153,153,1);
  font-size: 12px;
}
</style>
