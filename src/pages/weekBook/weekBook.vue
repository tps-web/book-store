<template>
  <div class="content">
   <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
       <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
           <goodsItem :listItem="list" v-if="total>0" />
       </van-list>
   </van-pull-refresh>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {getNewBookList} from '@/api'
import  goodsItem from '@/components/goodsItem/item'
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
       total:'',
       color:[{bg:'rgba(0,114,255,1)'},{bg:'rgba(255,205,1,1)'}]
    }
  },
  created(){
     that=this
     this.getBookPage()
  },
  methods:{
      getBookPage(){
        let op={curPage:that.curPage,pageRows:that.pageRows}
        getNewBookList(op).then(res=>{
            // console.log(res)
            this.total=res.data.total
            if(this.curPage==1){
                this.list=res.data.rows
            }else{
                this.list=this.list.concat(res.data.rows)
            }
        })
    },
     //上拉刷新
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
            this.getBookPage()
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
.img{
    width: 150px;
    height: 200px;
}
.storeName{
  width: 94%;
  text-align: left;
  margin-left: 8px;
  padding: 6px 8px;
}
.category{
	width: 96%; 
	font-size: 10px;
	display: flex;
}
.one{
	opacity:0.7;
	padding:3px;
	border-radius: 4px;
	margin:0 4px;
}
.price{
  padding: 6px;
  width: 94%;
  height: 18px;
  line-height: 18px;
  font-size: 12px;
  text-align: left;
  color: rgba(252,86,80,1);
  display: flex;
  justify-content: space-between;
}
.cart_img{
  width: 18px;
  height: 18px;
}
.num{
  font-size: 16px;
}
/* .grid_item{
  box-shadow:0px 0px 4px 0px rgba(0,0,0,0.1);
} */
/* /deep/ .van-grid-item__content{
  padding: 0 !important;
  margin: 6px 4px;
} */
</style>
