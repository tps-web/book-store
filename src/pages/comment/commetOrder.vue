<template>
 <div>
 <div class="Box">
     <!-- <div class="content">
       <div class="goods"  @click="goDetails(item.orderSn)">
         <div class="bigBox">
           <div class="box" v-for="(item,index1) in item.list" :key="index1">
             <van-image class="goodsImg" :src="item.bookPic" radius="6px" style="box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);"/>
           </div>
         </div>
          <div class="goods_right">
            共{{item.list.length}}件商品<van-icon name="arrow" class="right_icon" />
          </div>
       </div>
    </div> -->
    <div class="start">服务<van-rate v-model="value" style="margin-left:6px;position:relative;top:3px;"/></div>
  <van-field
  v-model="message"
  rows="5"
  type="textarea"
  placeholder="请填写评论吧..."
/>
 <van-uploader :after-read="afterRead" v-model="fileList"  :max-count="2" class="upload"/>
 </div>
    <van-button type="info" round  size="large" style="width:90%;margin:10px auto">提交</van-button>
</div>
</template>
<script>
export default {
  name: 'commentOrder',
  data () {
    return {
      value: 0,
      fileList:[],
      message:''
    }
  },
   created(){
  },
   methods: {
     afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
     }
    },
 mounted() {
  
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Box{
  width:92%;
  padding:10px;
  height:300px;
  margin:10px auto;
  text-align:left;
  box-shadow: 0px 0px 0px 1px #ccc;
  border-radius:10px;
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
.goodsImg{
   width: 75px;
  height: 75px;
}
.right_icon{
  position: relative;
  top: 2px;
}
</style>
