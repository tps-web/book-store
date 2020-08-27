<template>
  <div class="content">
     <!-- <headerNav title="商品详情"/> -->
      <!-- 商品图片 -->
      <div class="top">
          <div class="top_left">
              <van-image class="bookImg"  radius="6px"  :src="goodsInfo.squareImage" />
          </div>   
         <div class="top_right">
            <div class="title">{{goodsInfo.title}}</div>
             <div class="book_press">
                <div class="author">作者:{{goodsInfo.author}}</div>
                <div class="press">出版社:{{goodsInfo.press}}</div>
             </div>
             <div class="type">
                <div class="desc"  v-for="(type,index) in goodsInfo.categoryName" :key="index" >
                    <div class="box">
                        {{type}}
                    </div>
                </div>
             </div>
              <div class="price">
                <span class="fh" style="margin-left: 8px;"  v-show="goodsInfo.promotionAmount">￥</span> <span class="promotionAmount" v-show="goodsInfo.promotionAmount">{{goodsInfo.promotionAmount}}</span>
                <div class="priceF" style="display:inline-block;margin-left:8px">
                    <span :class="[goodsInfo.promotionAmount==null ? 'periceC':'priceNum']" >￥{{goodsInfo.price|decimals}}</span>
                    <!-- <span class="priceNum"  v-bind:style="{'text-decoration':goodsInfo.promotionAmount ? 'line-through':'none'}" >￥{{goodsInfo.price}}</span> -->
                </div>
                <!-- <div class="vip">会员免费借书看</div> -->
              </div>
              <div class="remark">剩余{{residue}}本</div>
              <div class="remark">已有{{goodsInfo.lendCount}}会员免费借阅</div>   
         </div>
      </div>
    <!-- 商品信息 -->
    <div class="storeDesc">
      <Vip v-show="userInfo.memberFlag==0"/>
      <!-- 租赁流程  归还流程-->
       <Rental/>
       <!-- 产品介绍 -->
      <div class="desTitle">商品简介</div>
       <!-- 简介 -->
       <Introduce  :introduction="introduction" v-if="introduction.introduction"/>
        <!-- <div class="descBox">
          <div class="p">纸张:{{goodsInfo.usingPaper}}</div>
          <div class="p">格式：{{goodsInfo.format}}</div>
          <div class="p">包装：{{goodsInfo.packing}}</div>
          <div class="p">页数：{{goodsInfo.pageCount}}</div>
          <div class="p1">出版社：{{goodsInfo.press}}</div>
          <div class="p">出版时间：{{goodsInfo.publicationTime}}</div>
          <div class="p">语言：{{goodsInfo.textLanguage}}</div>
          <div class="p">重量：{{goodsInfo.weight}}</div>
       </div> -->
          <!-- <div class="p">国际标准书号:{{goodsInfo.originalIsbn}}</div> -->
       <!-- 评论 -->
       <Comment :commentList="commentList" :bookId="bookId"  v-if="commentList"/>
       <!-- 推荐 -->
       <div class="pad">
          <Recommend  :recommendlist="recommendlist" v-if="recommendlist.length>0"/>
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
import { mapState, mapMutations,mapActions } from 'vuex'
import {getBookDesc} from '@/api'
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
       goodsInfo:"",
       recommendlist:[],
       introduction:{},
       commentList:"",
       bookId:'',
       residue:''
    }
  },
  computed:{
    ...mapState(['shopCart','userInfo','memberInfo']),
    goodsNum(){
      let num = Object.keys(this.shopCart).length
      if(num>=1){
        return num
      }
    }
  },
   created(){
    //  console.log(this.$route.params.id)
    //获取绘本信息
      let op ={ id : this.$route.params.id , curPage:1, pageRows :4}
      getBookDesc(op).then(res=>{
        // console.log(res.data)
        this.recommendlist=res.data.acviseBook.records
        this.goodsInfo=res.data.book
        this.residue=res.data.book.total-res.data.book.remainder
        this.introduction.squareImage=res.data.book.squareImage
        this.introduction.introduction=res.data.book.introduction
        this.commentList=res.data.commentList
        this.bookId=res.data.book.id
      })
  },
  mounted(){
  },
   methods: {
     ...mapActions(['addCart']),
    //  ...mapMutations(['ADD_TO_CART']),
    onChange(index) {
      this.current = index;
    },
    onClickIcon(){
      this.$router.push('/cart')
    },
    //加入购物车
    onClickButton(){
      // this.$toast('加入购物车')
      // this.ADD_TO_CART(this.goodsInfo);
      if(this.residue!=0){
        this.addCart(this.goodsInfo) 
      }else{
        this.$toast('库存不足')
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top{
    width: 94%;
    margin: 10px auto;
    display: flex;
    padding: 4px;
}
.top_left{
    width: 40%;
    height: 180px;
    display:-webkit-flex;
    display:flex;
    -webkit-flex-flow : column nowrap;
    flex-flow : column nowrap;
}
.bookImg{
    width: 100%;
    /* height: 170px; */
    margin-left : auto;
    margin-right : auto;
    margin: auto;
}
.top_right{
  width: 60%;
  margin-left: 10px;
  text-align: left;
}
.title{
    font-size: 17px;
    font-weight: 600;
}
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
.remark{
  color:rgba(153,153,153,1);
  margin-top: 6px;
  font-size: 12px;
}
.type{
    display:flex;
    flex-wrap:wrap;
    /* overflow-x:auto; */
    /* overflow-y:hidden; */
    /* justify-self: start; */
}
.desc{
    display:flex;
    justify-self: start;
	  font-size: 10px;
    flex-wrap:wrap;
}
.box{
    /* width: 80px; */
	  margin: 4px 8px 0 0;
    text-align: center;
    background:rgba(245,245,245,1);
    color:rgba(153,153,153,1);
    border-radius:8px;
    padding: 6px;
}
.book_press{
	width: 100%;
	margin: 10px 0 6px;
  color:rgba(153,153,153,1);
	font-size: 12px;
	text-align: left;
}
.press{
	margin-top: 4px;
}
.pad{
  margin-bottom: 66px;
}
.price{
  width: 100%; 
  margin-top: 4px;
  color:rgba(252,86,80,1);
  text-align: left;
  display: flex;
}
.fh{
  height: 32px;
  font-size: 16px;
  line-height: 40px;
}
.periceC{
  display: inline-block;
  color: red;
  height: 35px;
  line-height: 40px;
  font-size: 14px;
}
.priceNum{
  display: inline-block;
  height: 35px;
  line-height: 40px;
  font-size: 14px;
  color: #ccc;
  text-decoration:line-through
}
.vip{
  margin-left: 6px;
  height: 30px;
  line-height: 40px;
  color:rgba(153,153,153,1);
  font-size: 12px;
}
.promotionAmount{
  height: 35px;
  font-size: 18px;
  line-height: 38px;
}
.descBox{
  width: 90%;
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  /* border-top: 1px solid #000; */
  /* border-left: 1px solid #000; */
  /* border-bottom: 1px solid #000; */
  overflow: hidden;
}
.p1{
   width: 100%;
   text-align: left;
   padding: 4px 0;
   /* border-right: 1px solid #000; */
   /* border-bottom: 1px solid #000; */
}
.p{
  width: 49.5%;
  text-align: left;
  padding: 4px 0;
  /* border-right: 1px solid #000; */
  /* border-bottom: 1px solid #000; */
}
.desTitle{
    width:94%;
    margin: 0 auto;
	  font-size:16px;
    color:rgba(34,34,34,1);
    font-weight:700;
    text-align: left;
}
</style>
