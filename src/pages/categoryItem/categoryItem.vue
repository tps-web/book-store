<template>
  <div class="">
       <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
         <img src="../../assets/images/nodata.png" alt="" width="88" v-if="total===0&&finished" style="margin-top:100px">
       <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
       >
       <goods :listItem="list"/>
     </van-list>
   </van-pull-refresh>
  </div>
</template>

<script>
import {getChildCategoryBookList} from '@/api'
import goods from './itemGoods'
var that 
export default {
    components:{
        goods
    },
  data () {
    return {
        id:this.$route.params.id,
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
     that.pageList()
  },
  methods:{
      pageList(){
        let op={curPage:that.curPage,pageRows:that.pageRows,categoryId:that.$route.params.id}
        getChildCategoryBookList(op).then(res=>{
            // console.log(res) 
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
        this.list=[]
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
            this.pageList()
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

</style>
