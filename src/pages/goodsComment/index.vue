<template>
  <div class="">
      <div class="box" v-for="(item,index) in list" :key="index" >
          <!-- <div>
             <van-image class="img" radius="6" :src="item.bookPic" @click="godesc(item.bookId)" />
          </div> -->
            <div class="imgBox">
               <van-image class="img" radius="6" :src="item.bookPic" @click="godesc(item.bookId)" />
            </div>
            <div class="msg"  @click="godesc(item.bookId)">
                <div>{{item.bookName}}</div>
                <div style="margin-top:6px;">{{item.bookPress}}</div>
                <div style="margin-top:6px;color:red">￥{{item.bookPrice|decimals}}</div>
            </div>
            <div class="btn">
                <van-button round  plain color="red"  size="mini" style="padding:8px" @click="goComment(item)" v-if="item.commentCount==0">去评价</van-button>
                <van-button round  plain color="red"  size="mini" style="padding:8px" @click="goComment(item)" v-else>追加评论</van-button>
            </div>
      </div>
  </div>
</template>

<script>
import {getOrderDesc} from '@/api'
export default {
  data () {
    return {
        list:''
    }
  },
  created(){
      getOrderDesc(this.$route.params.id).then(res=>{
          this.list=res.data.item.list
      })
  },
  methods:{
      godesc(id){
          this.$router.push(`/goodsDetails/${id}`)
      },
    goComment(item) {
        this.$router.push({
          path: '/commentItme',
          query:{
　　　　　　　　id:item.bookId,
              orderItemId:item.id,
            //   bookName:item.bookName
　　　　　　}
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
    width: 92%;
    margin: 10px auto;
    display: flex;
    border-radius: 6px;
    padding: 6px;
    box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.1);
    position: relative;
}
.imgBox{
    display:-webkit-flex;
    display:flex;
    -webkit-flex-flow : column nowrap;
    flex-flow : column nowrap;
    width: 78px;
    height: 88px;
}
.img{
    width: 100%;
    margin-left : auto;
    margin-right : auto;
    margin: auto;
}
.msg{
    text-align: left;
    margin-left: 10px;
}
.btn{
    position: absolute;
    right: 16px;
    bottom: 10px;
}
</style>
