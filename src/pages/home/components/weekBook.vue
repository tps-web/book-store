<template>
  <div class="">
    <div class="title">
    	<span class="tit_left">{{weekItem.indexName}}</span>
    	<span class="tit_move" @click="goMove">更多</span>
    </div>
    <van-swipe :loop="false"  :show-indicators='false' class="box" :width="375">
        <van-swipe-item v-for="(item,index) in weekItem.data.records" :key="index" @click="goGoodsDesc(item.id)" class="swipeBox">
            <div class="item">
              <div class="boxImg">
                  <van-image  :src="item.squareImage" class="img"/>
              </div>
              <!-- <van-image width="100" height="120" src="https://huisn-1253895285.cos.ap-guangzhou.myqcloud.com/resourcePlus/CaiZhouMianBaoZouDeNvHai/1583999060949_1.jpg" /> -->
              <div class="right">
                 <div class="tit">{{item.title}}</div>
                 <div class="desc">{{item.introduction|testfilter(10)}}</div>
                 <div class="line" >
                   <span v-for="(category,index1) in  item.categoryName.slice(0,2)" :key="index1">{{category}}</span>
                 </div>
                 <div class="price">
                     <div style="display:inline-block;margin-right:4px" v-show="item.promotionAmount"><span>￥</span><span class="num">{{item.promotionAmount|decimals}}</span></div>
                     <div :class="[item.promotionAmount?'show_decoration':'noshow']">
                        <span>￥{{item.price|decimals}}</span>
                     </div>
                   </div>
              </div>
            </div>
        </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
export default {
  name:'weekItem',
   props:{
   weekItem:{
       type:Object
    }
   },
  data () {
    return {
    }
  },
  created(){
  },
  methods:{
    goMove(){
      // this.$toast('点击更多')
      this.$router.push('/weekBook')
    },
    goGoodsDesc(id){
      this.$router.push(`/goodsDetails/${id}`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
	width: 92%;
	margin: 6px auto 0; 
	display: flex;
	justify-content: space-between;
}
.tit_left{
  font-size: 14px;
  font-weight:600;
}
.tit_move{
	font-size: 12px;
	color:rgba(153,153,153,1);
}
.box{
  width: 95%;
  width: 100%;
  margin: 6px auto;
  overflow: hidden;
}
.item{
    width: 88%;
    padding: 6px;
    display:flex;
    /* box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.1); */
    margin: 0 2px;
    border-radius: 5px;
    border: 1px solid rgba(0,0,0,0.1);
    /* border: 1px solid red; */

}
.right{
    text-align: left;
    margin-left: 10px;
}
.tit{
    padding: 4px 4px 6px 0;
}
.desc{
    color:rgba(153,153,153,1);
    font-size: 12px;
}
.line span{
    width: 50px;
    /* height: 16px; */
    line-height: 18px;
    text-align: center;
    font-size: 10px;
    display: inline-block;
    padding: 2px 0px;
    margin: 10px 4px 0;
    margin-left: 0px;
    background: rgb(237, 233, 224);
    color:rgba(153,153,153,1);
    border-radius: 10px;
}
.price{
    font-size: 10px;
    margin-top: 10px;
    color: #FC5650;
}
.num{
    font-size: 16px;
}
.promotionAmount{
  font-size: 18px;
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
.boxImg{
   display:-webkit-flex;
    display:flex;
    -webkit-flex-flow : column nowrap;
    flex-flow : column nowrap;
    /* background-color:#eee; */
    width: 100px;
    height: 120px;
}
.img{
  width: 100%;
  margin-left : auto;
  margin-right : auto;
  margin: auto;
}
</style>
