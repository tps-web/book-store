
<template>
  <div class="">
   <van-tabs v-model="active" swipeable sticky>
    <van-tab v-for="(item,index) in 12" :title="'选项 ' + index" :key="index">
    	<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      	   <van-grid :column-num="2" :border="false">
      	   	 <van-grid-item v-for="(item,index) in 6" :key="index" @click="goDetails(index)">
              <van-image src="https://huisn-1253895285.cos.ap-guangzhou.myqcloud.com/resourcePlus/HongWuXie/1590377209024_1.jpg" radius="6px" />
                <div class="storeName">红舞鞋</div>
                   <div class="category" >
                      <div v-for="(item,index) in 2" :key="index" :style="{background:color[index].bg}" class="one">
         	              <span style="color:#000; opacity: 1">0-3岁</span>
                      </div>
                  </div>
              </van-grid-item>
      	    </van-grid>
      	  </van-pull-refresh>
    </van-tab>
  </van-tabs>

  </div>
</template>

<script>

export default {
  data () {
    return {
    	isLoading:false,
    	active:0,
    	color:[{bg:'rgba(0,114,255,1)'},{bg:'rgba(255,205,1,1)'}]
    }
  },
  methods:{
  	goDetails(id){
  		console.log(id)
  		this.$router.push('/goodsDetails')
  	},
  	onRefresh(){
       setTimeout(() => {
  	      this.$toast('刷新成功')
  	      this.isLoading=false
  	  },1000)
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.storeName{
	width: 96%;
	font-family:PingFangSC-Regular,PingFang SC;
    text-align: left;
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

</style>
