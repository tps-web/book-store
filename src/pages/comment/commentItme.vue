<template>
 <div>
    <div class="top">
      <div class="imgBox">
         <van-image  :src="bookDesc.squareImage" class="goodsImg"/>
      </div>
        <!-- <van-image width="50" height="50" :src="bookDesc.squareImage"/> -->
        <div class="startBox">
          <div class="title">书本评价</div>
          <van-rate v-model="startValue"/><span class="startDesc">{{startDesc}}</span>
        </div>
    </div>
 <div class="Box">
    <div class="start">分享你的使用体验吧</div>
      <van-field
      v-model="message"
      rows="5"
      type="textarea"
      placeholder="请填写评论吧..."
    />
    <!-- <div class="item" v-for="(item,index) in imgList" :key="index">
        <img :src="item" alt="" style="width:60px;height:60px">
    </div> -->
   <!-- <van-uploader :after-read="afterRead"   v-model="fileList" :max-count="9" class="upload"/> -->
 </div>
    <van-button type="info" round  size="large" style="width:90%;margin:10px auto" @click="goSubmit">提交</van-button>
</div>
</template>
<script>
import {getBookDesc,uploadImages,commentSave} from '@/api'
import { getToken } from '@/utils/authcookie'
export default {
  name: 'commentOrder',
  data () {
    return {
      startValue: 5,
      fileList:[],
      imgList:[],
      message:'',
      bookDesc:'',
      startDesc:"非常好"
    }
  },
   created(){
    //  console.log(this.$route.query.id)
     let op={
        id:this.$route.query.id,
        curPage:1,
        pageRows:1,
        isHotSearch:0
      }
     getBookDesc(op).then(res=>{
       console.log(res)
       this.bookDesc=res.data.book
     })
  },
  watch:{
    startValue(newVal){
       switch (newVal) {
         case 1:
           this.startDesc='非常差'
           break;
        case 2:
           this.startDesc='差'
           break;
        case 3:
           this.startDesc='一般'
           break;
        case 4:
           this.startDesc='好'
           break;
         default:
           this.startDesc='非常好'
           break;
       }
    }
  }, 
   methods: {
     goSubmit(){
      var info = JSON.parse(getToken())
      var op={
        "bookId": this.$route.query.id,
        "bookName": this.bookDesc.title,
        "content": this.message,
        "memberIp": info.userId,
        "star": this.startValue,
        "userHead": info.userHead,
        "userNickName": info.userNickName,
        "orderItemId":this.$route.query.orderItemId,
      }
      commentSave(op).then(res=>{
        // console.log(res.data.item.id)
        // var arr=[]
        const fromdata=new FormData();
      //   for(var i = 0;i<this.fileList.length;i++){
      //     fromdata.append('files',this.fileList[i].file);
      //  }
        fromdata.append('id',res.data.item.id)
        // uploadImages(fromdata).then(res=>{
        //    console.log(res)
        //    this.$toast('评论成功')
        //    history.back();
        // })
         this.$toast('评论成功')
         history.back();
      })
      // console.log(op)
     },
    //  fileAdd(file,id){
    //    const fromdata=new FormData();
    //    fromdata.append('files',file);
    //    fromdata.append('id',id)
    //     uploadImages(fromdata).then(res=>{
    //       console.log(res)
    //        this.$toast('评论成功')
    //        history.back();
    //     })
    //  },
     afterRead(file) {
      // 此时可以自行将文件上传至服务器
        // const fromdata=new FormData();
        // fromdata.append('files',file.file);
      // console.log(file.file);
      // uploadImages(fromdata).then(res=>{
      //   // console.log(res.data.items)
      //   this.imgList=this.imgList.concat(res.data.items)
      // })
     }
    },
 mounted() {
  
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top{
  background: #fff;
  padding: 16px;
  display: flex; 
  box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.1);
}
.startBox{
  margin-left: 10px;
}
.title{
  text-align: left;
  margin-bottom: 10px;
}
.startDesc{
  position: relative;
  top: -3px;
  left: 10px;
  font-size: 10px;
  color: #666;
}
.Box{
  /* width:92%; */
  padding:10px 8px;
  /* height:300px; */
  margin:16px auto;
  text-align:left;
  box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.1);
  /* border-radius:10px; */
}

.start{
  width:92%;
  margin:6px auto;
  text-align:left;
  height:24px;
  line-height:24px;
}
.upload{
  margin:10px auto;
  margin-left: 10px;
}
.goods{
  position: relative;
  width: 100%;
  height: 90px;
  margin: 4px auto;
  display: flex;
}
.goods_right{
  position:absolute;
  right: 0px;
  font-size: 12px;
  top: 36px;
}
.bigBox{
  width: 250px;
  overflow-x: auto;
  display: flex;
}
.box{
  width: 75px;
  height: 75px;
  margin: auto 4px;
}
.imgBox{
  width: 50px;
  height: 60px;
  display:-webkit-flex;
  display:flex;
  -webkit-flex-flow : column nowrap;
  flex-flow : column nowrap;
}
.goodsImg{
   width: 100%;
   margin-left : auto;
   margin-right : auto;
   margin: auto;
}
.right_icon{
  position: relative;
  top: 2px;
}
</style>
