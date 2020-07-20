<template>
  <div class="">
    <div class="title">
    	<span class="tit_left">本周新书</span>
    	<span class="tit_move" @click="goMove">更多</span>
    </div>
    <van-swipe :loop="false" :width="280" height="136" :show-indicators='false' class="box">
        <van-swipe-item v-for="(item,index) in 4" :key="index">
            <div class="item">
              <van-image width="100" height="120" src="https://huisn-1253895285.cos.ap-guangzhou.myqcloud.com/resourcePlus/CaiZhouMianBaoZouDeNvHai/1583999060949_1.jpg" />
              <div class="right">
                 <div class="tit">踩着面包走的女孩</div>
                 <div class="desc">英格尔是一个很穷但又...</div>
                 <div class="line"><span>尊重需求</span><span>0-3岁</span></div>
                 <div class="price"><span class="fh">￥</span><span class="num">19.90</span></div>
              </div>
            </div>
        </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  methods:{
    goMove(){
    this.$toast('点击更多')
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
    box-shadow:0px 0px 4px 0px rgba(0,0,0,0.1);
    margin: 0 4px;
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
    line-height: 16px;
    text-align: center;
    font-size: 10px;
    display: inline-block;
    padding: 3px 0px;
    margin: 10px 4px;
    margin-left: 0px;
    background: rgba(187,187,187,1);;
    color: #fff;
    border-radius: 10px;
}
.price{
    font-size: 10px;
    color: #FC5650;
}
.num{
    font-size: 18px;
}
</style>
