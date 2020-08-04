<template>
  <div class="">
      <van-image class="topImg" :src="topBg.listImage" />
      <div class="descBox">
          <div class="small_box"> 
            <div class="tit">{{topBg.listName}}</div>
            <div class="desc">
               {{topBg.listDescribe}}
            </div>
         </div>
      </div>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
         <img src="../../assets/images/nodata.png" alt="" width="88"  style="margin-top:50px" v-if="list.length==0&&finished">
       <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
       >
      <div class="content_box">
          <div class="store_box" v-for="(item,index) in list" :key="index">
            <van-image class="store_boxImg" radius="4px" :src="item.verticalImage" @click="goDesc(item.id)"/>
            <div class="store_box_content" @click="goDesc(item.id)">
                <div class="title">{{item.title}}</div>
                <div class="author">作者：{{item.author}}</div>
                <div class="price">
                    <span class="fh">￥</span>
                    <span class="priceNum">{{item.price}}</span>
                </div>
            </div>
            <div class="store_box_right" @click="goCart(item)">
              <van-image :src="require('../../assets/images/homeCart.png')" class="cart_img"/><span class="font">加入购物车</span>  
            </div>
          </div>
      </div>
       </van-list>
      </van-pull-refresh>
  </div>
</template>

<script>
import {getListItem} from '@/api'
import {mapMutations,mapActions} from 'vuex'
import  nodata from '@/components/nodata'
var that 
export default {
  components:{
      nodata
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
       topBg:{
         listImage:'',
         listName:'',
         listDescribe:''
       }
    }
  },
  created(){
      that=this
    //   console.log(this.$route.params.id)
      this.getItem()
  },
  methods:{
    //  ...mapMutations(['ADD_TO_CART']),
     ...mapActions(['addCart']),
     //跳转详情页面
     goDesc(id){
        // console.log(id)
        this.$router.push(`/goodsDetails/${id}`)
     },
     //加入购物车
      goCart(item){
        this.addCart(item);
        // this.ADD_TO_CART(item)
      },
    getItem(){
       let op={curPage:that.curPage,pageRows:that.pageRows,id:this.$route.params.id}
        getListItem(op).then(res=>{
            // console.log(res)
            this.total=res.data.item.listCount
            this.topBg.listImage=res.data.item.listImage
            this.topBg.listName=res.data.item.listName
            this.topBg.listDescribe=res.data.item.listDescribe
            if(this.curPage==1){
                this.list=res.data.item.list
            }else{ 
                this.list = this.list.concat(res.data.item.list)
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
             if (!this.total) {
               this.finished = true;
            }
            // if (this.list.length >= this.total) {
            //    this.finished = true;
            // }
        }, 1000);
     }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.topImg{
    width: 100%;
    height: 240px;
    background:rgba(0,0,0,1);
    opacity:0.85;
}
.descBox{
    position: relative;
    padding: 16px 10px;
    border-radius:8px;
    width: 86%;
    margin: 0px auto;
    margin-top: -50px;
    background:rgba(255,255,255,1);
    z-index: 2;
    box-shadow:0px 1px 4px 0px rgba(0,0,0,0.1);
}
.small_box{
    width: 94%;
    margin:  0 auto;
}
.tit{
    text-align: left;
    font-size: 14px;
}
.desc{
    margin-top: 6px;
    font-size: 12px;
    color:rgba(153,153,153,1);
    text-align: left;
}
.content_box{
    width: 94%;
    margin: 0 auto;
    /* position: relative;
    top: -40px; */
}
.store_box{
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 12px auto;
  box-shadow: 1px 1px 3px 1px rgba(0,0,0,0.1);
  padding: 12px 10px;
  border-radius:8px;
}
.store_boxImg{
    width: 70px;
    height: 90px;
}
.store_box_content{
    flex: 6;
    margin-left: 12px;
    text-align: left;
}
.title{
    margin-top: 5px;
}
.author{
    color: #999;
    margin: 10px 0;
}
.price{
    margin: 6px 0;
    color: #FC5650;
}
.fh{
    font-size: 12px;
}
.priceNum{
    font-size: 16px;
}
.store_box_right{
    flex: 4;
    margin: auto 0;
    color: #999;
    font-size: 10px;
}
.cart_img{
    width: 20px;
    height: 20px;
}
.font{
    position: relative;
    top: -5px;
    left: 4px;
    display: inline-block;
    height: 28px;
    line-height: 28px;
}
</style>
