<template>
  <div class="">
   <headline headline="猜你喜欢" />
    <van-grid :column-num="2" :border="false">
      <van-grid-item v-for="(item,index) in bookList" :key="index" @click="goToGoodsDetail(item)">
         <van-image :src="item.squareImage" radius="6px" />
         <div class="storeName">{{item.storyName}}</div>
         <div class="category" >
         	<div v-for="(item,index) in 2" :key="index" :style="{background:color[index].bg}" class="one"><span style="color:#000; opacity: 1">0-3岁</span></div>
         </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  props:{
    bookList:{
      type:Array,
    }
  },
  data () {
    return {
    	color:[{bg:'rgba(0,114,255,1)'},{bg:'rgba(255,205,1,1)'}]
    }
  },
  created(){
  },
  methods:{
    goToGoodsDetail(item){
        console.log(item)
          this.$router.push({
            name: "goodsDetails",
            query: {
              id: item.sid,
              storyName:item.storyName,
              bgImage:item.squareImage,
              images: item.images,
              storyCategoryName:item.storyCategoryName,
              price:item.price,
              introduction:item.introduction
          }
        })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.storeName{
	width: 100%;
	font-family:PingFangSC-Regular,PingFang SC;
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

</style>
