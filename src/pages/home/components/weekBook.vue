<template>
  <div class="">
    <div class="title">
    	<span class="tit_left">本周新书</span>
    	<span class="tit_move" @click="goMove">更多</span>
    </div>
    <van-swipe :loop="false" :width="280" height="136" :show-indicators='false' class="box">
        <van-swipe-item v-for="(item,index) in weekItem.data.records" :key="index" @click="goGoodsDesc(item.id)">
            <div class="item">
              <van-image width="100" height="120" :src="item.squareImage" />
              <!-- <van-image width="100" height="120" src="https://huisn-1253895285.cos.ap-guangzhou.myqcloud.com/resourcePlus/CaiZhouMianBaoZouDeNvHai/1583999060949_1.jpg" /> -->
              <div class="right">
                 <div class="tit">{{item.title}}</div>
                 <div class="desc">{{item.introduction|testfilter(10)}}</div>
                 <div class="line" >
                   <span v-for="(category,index1) in  item.categoryName.slice(0,2)" :key="index1">{{category}}</span>
                 </div>
                 <div class="price">
                   <span class="fh">￥</span><span class="num"  v-bind:style="{'text-decoration':item.promotionAmount ? 'line-through':'none'}">{{item.price}}</span>
                   <span class="fh" style=" margin-left: 6px;" v-if="item.promotionAmount">￥</span><span class="promotionAmount" v-if="item.promotionAmount">{{item.promotionAmount}}</span>
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
  margin: 6px auto;
}
.item{
    padding: 6px;
    display:flex;
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.1);
    margin: 0 5px;
    border-radius: 5px;
    border: 1px solid rgba(0,0,0,0.1);
}
.right{
    text-align: left;
    margin-left: 8px;
}
.tit{
    padding: 4px 4px 6px 0;
}
.desc{
    color:rgba(153,153,153,1);
    font-size: 12px;
}
.line span{
    width: 54px;
    height: 16px;
    line-height: 18px;
    text-align: center;
    font-size: 10px;
    display: inline-block;
    padding: 3px 0px;
    margin: 10px 4px 0;
    margin-left: 0px;
    background:rgba(245,245,245,1);
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
</style>
