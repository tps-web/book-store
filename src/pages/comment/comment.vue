<template>
  <div class="box">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
             <comment :commentList="list" v-if="list.length"/>
          </van-list>
      </van-pull-refresh>
  </div>
</template>

<script>
import {getBookDesc} from '@/api'
import comment from '@/components/comment/item'
var that 
export default {
 components:{
     comment
  },
  data () {
    return {
       isLoading:false, //上拉
       finished:false, //是否加载完
       loading:false,  //下拉
       curPage:1, //当前页面
       pageRows:6, //请求一页有多少数据
       list:[],  
       total:'',
    }
  },
  created(){
      that=this
    //   console.log(this.$route.params.id)
      this.getItem()
  },
  methods:{
       getItem(){
       let op={curPage:that.curPage,pageRows:that.pageRows,id:this.$route.params.id}
        getBookDesc(op).then(res=>{
            // console.log(res.data.commentList.records)
            this.total=res.data.commentList.total
            if(this.curPage==1){
                this.list=res.data.commentList.records
            }else{
             this.list = this.list.concat(res.data.commentList.records)
            }
        })
    },
    onRefresh(){
        // 清空列表数据
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
            this.getItem()
            this.loading = false;
            // console.log(this.list.length)
            // console.log(this.total)
            if (this.list.length >= this.total) {
               this.finished = true;
            }
        }, 1000);
     }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
    width: 92%;
    padding: 4px;
    margin: 14px auto;
}
</style>
