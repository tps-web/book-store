<template>
  <div class="">
    <div class="comments" v-for="(item,index) in commentList" :key="index">
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
</template>

<script>

export default {
  props:["commentList"],
  data () {
    return {
    }
  },
  created(){
	  console.log(this.commentList)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comments{
	display: flex;
	padding: 8px 0 2px 0;
	box-shadow: 0 0 4px rgba(0,0,0,0.1);;
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
</style>
