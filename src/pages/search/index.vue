<template>
  <div class="">
    <van-search
    v-model="value"
    show-action
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="onCancel"
  />
    <div class="hotBook" v-show="isShow">
        <div class="hot">热门书籍</div>
        <div class="" v-for="(item,index) in hotBookList" :key="index">
          <div class="hotDesc" @click="goDesc(item.id)" >
            <span :style="index<=2?'color:red':''">{{index+1}}</span>
          <span class="bookName">{{item.title}}</span></div>
        </div>
    </div>
     <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh" v-show="total>0"> -->
        <nodata  v-show="total==0&&!isShow&&finished" style="margin-top:100px"/>
       <van-list
        v-if="value&&!isShow"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
       >
     <bookItem :list='list' v-if="total>0"/>
      </van-list>
    <!-- </van-pull-refresh> -->
    
  </div>
</template>

<script>
import {getHotBook,getHotBookItem} from '@/api'
import bookItem from './book'
import nodata from '@/components/nodata'
var that
export default {
  components:{
    bookItem,
    nodata
  },
  data () {
    return {
       hotBookList:[],
       isShow:true,
       value: '',
       isLoading:false, //上拉
       finished:false, //是否加载完
       loading:false,  //下拉
       curPage:1, //当前页面
       pageRows:6, //请求一页有多少数据
       list:'',  
       total:'',
       resList:''
    }
  },
  watch:{
    //  total(newVal){
    //    if(newVal>0){
    //      this.isShow=false
    //    }
    //  },
     value(newVal){
       if(!newVal){
          this.isShow=true
          // this.total=0
       }
     }
  },
  created(){
    getHotBookItem().then(res=>{
      // console.log(res.data)
      this.hotBookList=res.data.rows
    })
    that=this
  },
  methods: {
    goDesc(id){
      this.$router.push(`/goodsDetails/${id}`)
    },
    //上拉
    onRefresh(){
        this.curPage=0
        this.list=[]
        that.resList=""
      //  清空列表数据
        this.finished = false;
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true;
        this.onLoad();
    },
    //下拉刷新
     onLoad(){
          setTimeout(() => {
            if (this.isLoading) {
                 this.isLoading = false;
            }
            this.curPage++
            this.getSearch()
            this.loading = false;
            // if (this.list.length >= that.total) {
            //    this.finished = true;
            // }
            if(that.resList.length===0){
              this.finished = true;
            }
        }, 1000);
     },
    onSearch(val) {
      this.list=""
      that.resList=""
      this.curPage=1
      this.finished = false;
      // this.$toast(val);
      this.getSearch()
    },
    onCancel() {
      this.isShow=true
      this.list=[]
      this.$router.go(-1)
      // this.$toast('取消');
    },
    //搜索
    getSearch(){
      if(that.value){
        that.isShow=false
            let op={curPage:that.curPage,pageRows:that.pageRows,keyWord:that.value}
            getHotBook(op).then(res=>{
              // console.log(res.data)
              that.resList=res.data.rows
              that.total=res.data.total 
              if(that.curPage==1){
                      that.list=res.data.rows
              }else{
                  that.list=that.list.concat(res.data.rows)
              }
            })
      }else{
        that.$toast('搜索内容不能为空')
      }
    
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hotBook{
	width: 94%;
	margin: 0 auto;
}
.hot{
	  font-size: 18px;
	  font-weight:500;
    color:rgba(34,34,34,1);
    text-align: left;
    padding: 6px;
}
.hotDesc{
	text-align: left;
	font-size: 14px;
	padding: 12px;
}
.bookName{
	margin-left: 12px;
}
</style>
