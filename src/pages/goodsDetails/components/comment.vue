<template>
  <div class="content">
  	<div class="top">
  	   <div class="title">
     	  评论
       </div>
       <div class="tit_right">
       	共1234条
       </div>
  	</div>
  	<div class="comments">
  		<div class="avatar"> 
  		    <van-image round width="44" height="44" src="https://img.yzcdn.cn/vant/cat.jpeg" />
  		</div>
  		<div class="comments_contents">
  			<div class="username">詹姆斯</div>
  			<div class="date">2020-7-10 18:02</div>
  			<div class="comments_desc">语速适中，适合小朋友听！</div>
  		</div>
  	</div>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
	width: 94%;
	margin: 10px auto;
}
.top{
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
	padding: 10px 0 10px 0;
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
