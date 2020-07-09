<template>
  <div class="">
    <div class="title">
    	<span class="tit_left">精选书单</span>
    	<span class="tit_move" @click="goMove">更多</span>
    </div>
    <van-grid :border="false" :column-num="3" style="font-size: 12px">
     <van-grid-item v-for="(item,index) in 3" :key="index"  >
       <div class="box">
       	 <van-image src="https://huisn-1253895285.cos.ap-guangzhou.myqcloud.com/resourcePlus/XiaoYaZiXueYouYong/1584007352918_0.jpg" width="44" height="44" radius="4px"/>
       	 <van-image src="https://huisn-1253895285.cos.ap-guangzhou.myqcloud.com/resourcePlus/MangRenMoXiang/1590389448790_2.jpg" width="44" height="44" radius="4px"/>
      <van-image src="https://huisn-1253895285.cos.ap-guangzhou.myqcloud.com/resourcePlus/ChangChuJinYuMaoDeTianE/1590456814104_2.jpg" width="44" height="44" radius="4px"/>
       	 <van-image src="https://huisn-1253895285.cos.ap-guangzhou.myqcloud.com/resourcePlus/HongWuXie/1590377209024_1.jpg" width="44" height="44" radius="4px"/>
       </div>
        <span class="name">获奖作品</span>
     </van-grid-item>
   </van-grid>
  </div>
</template>

<script>

export default {
  props: {
  },
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
<style  scoped>
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
.name{
	margin:4px 0;
}
.desc{
	font-size: 10px;
	color:rgba(153,153,153,1);
	margin-top: 2px;
}
</style>
