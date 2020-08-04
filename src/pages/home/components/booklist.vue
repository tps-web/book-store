<template>
  <div class="">
    <div class="title">
    	<span class="tit_left">精选书单</span>
    	<span class="tit_move" @click="goMove">更多</span>
    </div>
    <van-grid :border="false" :column-num="3" class="box" >
     <van-grid-item v-for="(item,index) in bookItem.data"  :key="index" @click="goUrl(item)" 
     style="border-radius:6px;">
       <!-- <div class="small_box"> -->
          <van-image :src="item.listImage" class="listImage"/>
       <!-- </div> -->
        <span class="name">{{item.listName}}</span>
     </van-grid-item>
   </van-grid>
  </div>
</template>

<script>

export default {
  props: {
    bookItem:Object
  },
  data () {
    return {
    }
  },
  created(){
    // console.log(this.bookItem.data)
  },
  methods:{
  	goMove(){
      //  this.$toast('点击更多')
       this.$router.push('/moveBookList')
    },
    goUrl(item){
      //  console.log(item.id)
      this.$router.push(`/bookList/${item.id}`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
.title{
	width: 92%;
	margin: 16px auto 0; 
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
  width: 94%;
  margin: 10px auto;
  font-size: 12px;
}

.name{
  width: 100%;
	margin: 6px 0;
  text-align: left;
}
.desc{
	font-size: 10px;
	color:rgba(153,153,153,1);
	margin-top: 2px;
}
.listImage{
  width: 100px;
  height: 80px;
}
/* /deep/ .van-grid-item__content{
  padding: 8px 6px;
  margin-right: 4px;
} */
</style>
