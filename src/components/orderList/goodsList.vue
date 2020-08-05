<template>
  <div class="">
       <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
       <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
       >
     <div class="box" v-for="(item,index) in list" :key="index" @click="godesc(item)">
       <van-image :src="item.bookPic" class="img"  radius="6"/>
       <div class="right">
            <div class="name">{{item.bookName}}</div>
            <div class="price"><span class="fh">￥</span><span class="num">{{item.bookPrice}}</span></div>
       </div>
     </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// import { mapMutations, mapState, mapGetters } from 'vuex'
import goodsItem from '../goodsItem/item'
import {getOrderItem} from '@/api'
var that
export default {
   components:{
     goodsItem
   },
  data () {
    return {
       isLoading:false, //上拉
       finished:false, //是否加载完
       loading:false,  //下拉
       curPage:1, //当前页面
       pageRows:6, //请求一页有多少数据
       list:[],  
       total:0,
    }
  },
  computed:{
    //...mapGetters({goods:'SELECTED_GOODS',clearedNum:'CLEARED_NUM'}),
   },
created(){
    that=this
    this.getItem()
},
mounted(){
  if (window.history && window.history.pushState) {
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', this.goBack, false);
  }
},
destroyed(){
  window.removeEventListener('popstate', this.goBack, false);
},
methods:{
   goBack(){
    var path=sessionStorage.getItem('path')
    var pathChildren= sessionStorage.getItem('pathChildren')
    this.$router.replace({path: `/bugAndRent/${path}/${pathChildren}`});
    //replace替换原路由，作用是避免回退死循环
  },
  godesc(item){
    this.$router.replace(`/goodsDetails/${item.bookId}`)
  },
     getItem(){
       let op={curPage:that.curPage,pageRows:that.pageRows,orderSn:this.$route.params.id}
        getOrderItem(op).then(res=>{
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
    width: 96%;
    margin: 10px auto;
    height: 100px;
    box-shadow:0px 0px 4px 0px rgba(0,0,0,0.1);
    border-radius: 8px;
    display: flex;
}
.img{
    width: 88px;
    height: 88px;
    margin: auto 10px;
}
.right{
    text-align: left;
}
.name{
  margin-top: 6px;
  font-size: 16px;
}
.price{
    color: red;
    margin: 10px 0;
}
.num{
    font-size: 20px;
}

</style>
