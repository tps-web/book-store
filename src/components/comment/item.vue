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

				<div class="pic" v-if="item.pics">
					<!-- <div v-for="(pic,index1) in JSON.parse(item.pics) " :key="index1"> -->
				      <van-image  width="66" height="66" :src="pic" v-for="(pic,index1) in JSON.parse(item.pics) " :key="index1" style="margin:4px" @click="viewPic(item.pics,index1)"/>
					</div>
				<!-- </div> -->
				<div v-for="(listItem,index2) in item.list" :key="index2" class="listBox">
				  <div><span style="color:#8CAACE">{{listItem.userNickName}}</span>  <span>回复：</span>
				    {{listItem.content}}
				  </div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import {ImagePreview} from 'vant'
export default {
  props:["commentList"],
  data () {
    return {
		active_:'',
        instance_before:'',
        instance_after:'',
    }
  },
  created(){
    
  },
 
  mounted(){
  },
   methods: {
	formatStr(pic){
        return JSON.parse(pic)
	},
	//图片预览
	viewPic(img,index){
      ImagePreview({
		  images:JSON.parse(img),
		  showIndex:true,
		  loop:false,
		  startPosition:index,
		  closeOnPopstate:true,
	  })
	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comments{
	display: flex;
	padding: 8px 0 4px 0;
    border-bottom: 1px solid #f5f5f5;
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
.pic{
	margin-bottom: 4px;
}
.listBox{
	padding: 6px;
    background: #f5f5f5;
	border-radius: 6px;	
}
</style>
