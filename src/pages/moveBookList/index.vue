<template>
  <div class="">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
       >
     <div class="box" v-for="(item,index) in list" :key="index" @click="goBookLiST(item.id)">
          <van-image :src="item.listImage" class="box_left" />
          <div class="box_right"> 
              <div class="title">
                  {{item.listName}}
              </div>
              <div class="desc">
                  {{item.listDescribe|testfilter(30)}}
              </div>
              <div class="total">共{{item.listCount || 0}}本</div>
          </div>
     </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import {getList} from '@/api'
var that
export default {
  data () {
    return {
       isLoading:false, //上拉
       finished:false, //是否加载完
       loading:false,  //下拉
       curPage:1, //当前页面
       pageRows:10, //请求一页有多少数据
       list:[],  
       total:''
    }
  },
  created(){
     that=this
     this.getBookPage()
  },
  methods:{
      goBookLiST(id){
         this.$router.push(`/bookList/${id}`)
      },
      getBookPage(){
        let op={curPage:that.curPage,pageRows:that.pageRows}
        getList(op).then(res=>{
            // console.log(res.data.rows)
            this.total=res.data.total 
            if(this.curPage==1){
                this.list=res.data.rows
            }else{
               this.list = this.list.concat(res.data.rows)
            }
        })
    },
      onRefresh(){
        that.curPage=0
        // 清空列表数据
        this.finished = false;
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true;
        this.onLoad();
     },
     goUrl(){
         this.$router.push('/bookList')
     },
     //下拉刷新
     onLoad(){
          setTimeout(() => {
            if (this.isLoading) {
                 this.isLoading = false;
            }
            this.curPage++
            this.getBookPage()
            this.loading = false;
            if (this.list.length >= this.total) {
               this.finished = true;
            }
        }, 500);
     }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
  position: relative;
  width:92%;
  height: 100px;
  margin: 12px auto;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 4px 0px rgba(0,0,0,0.1);
  border-radius:8px;
  display: flex;
  padding: 6px;
}
.box_left{
    flex: 3;
}
.box_right{
    flex: 7;
    margin-left: 14px;
    text-align: left;
}
.box_right .title{
   color:rgba(34,34,34,1);
   font-size: 16px;
   font-weight:500;
   margin-top: 6px;
}
.desc{
    margin: 10px 0;
    font-size: 12px;
    color:rgba(153,153,153,1);
}
.total{
    position:absolute;
    bottom: 15px;
    font-size: 12px;
    color: #FFCD01;
    margin-top: 10px;
}
</style>
