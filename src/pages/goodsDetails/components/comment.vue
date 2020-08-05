<template>
  <div class="content">
  	<div class="top">
  	   <div class="title">
     	  评论 （{{commentList.total}}）
       </div>
       <div class="tit_right" @click="goMove" v-show="commentList.total>=4">
       	查看全部
       </div>
  	</div>
	  <div v-if="commentList.total>0">
		<div class="comments" v-for="(item,index) in commentList.records" :key="index">
			<div class="avatar"> 
				<van-image round width="44" height="44" :src="item.userHead" />
			</div>
			<div class="comments_contents">
				<div class="username">{{item.userNickName}}</div>
				<div class="date">{{item.createTime}}</div>
				<div class="comments_desc">{{item.content}}</div>
			</div>
		</div>
	  </div>
	  <div class="nodata" v-else>
		  暂无评论
	  </div>
  </div>
</template>

<script>

export default {
   props:["commentList","bookId"],
  data () {
    return {
    }
  },
  created(){
	//   console.log(this.bookId)
  },
  methods:{
	  goMove(){
		  this.$router.push(`/comment/${this.bookId}`)
	  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
	width: 90%;
	margin: 10px auto;
	padding: 1px 8px 8px;
	/* box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.1) */
}
.top{
	margin: 20px auto 8px;
    display: flex;
    justify-content: space-between;
}
.title{
	font-size:14px;
    color:rgba(34,34,34,1);
    font-weight:600;
}
.tit_right{
	font-size: 12px;
  color:rgba(153,153,153,1);
}
.comments{
	display: flex;
	padding: 8px 0 2px 0;
}
.avatar{
	width: 16%;
	text-align: left;
}
.comments_contents{
  width: 80%;
  text-align:left;
  margin-top: 6px;
}
.username{
	font-size: 12px;
	font-weight:400;
   color:rgba(34,34,34,1);
}
.date{
	font-size: 10px;
	color:rgba(153,153,153,1);
	margin-top: 4px;
}
.comments_desc{
	padding: 6px 0 8px;
}
.nodata{
	padding: 10px;
	color: #999;
}
</style>
