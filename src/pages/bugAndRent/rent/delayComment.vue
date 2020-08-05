<template>
  <div>
   <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <img src="../../../assets/images/nodata.png" alt="" width="88"  style="margin-top:50px" v-if="total==0&&finished">
       <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
       >
    <div class="bugAll" v-for="(item,index) in list" :key="index" >
    <div class="title">
        <div class="left">借书订单</div>
        <div class="right">{{item.status|orderStatus}}</div>
    </div>
    <div class="content">
         <!-- 商品列表-->
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
    </div>
    <div class="btn">
        <!-- 提醒发货  确定收货  删除订单  待评论 -->
       <van-button color="#FC5650" size="small" plain round @click="gobtnText(item)" v-if="item.status!=1&&item.status!=4&&item.status!=5">{{item.status|btnText}}</van-button>
       <van-button color="#FC5650" size="small" plain round @click="cancel(item)" v-if="item.status!=0&&item.status!=3&&item.status!=4&&item.status!=2&&item.status!=5">取消订单</van-button>
       <van-button color="#FC5650" size="small" plain round @click="del(item)" v-show="item.status==4||item.status==5" >删除订单</van-button>
       <van-button color="#FC5650" size="small" plain round @click="confim(item)" v-show="item.status==2" >确定收货</van-button>
    </div>
  </div>
   </van-list>
  </van-pull-refresh>
  </div>
</template>

<script>
var that
import {getOrderType,updateOrder,removeOrder} from '@/api'
import {orderStatus} from '@/utils'
export default {
 
  data () {
    return {
       isLoading:false, //上拉
       finished:false, //是否加载完
       loading:false,  //下拉
       curPage:1, //当前页面
       pageRows:6, //请求一页有多少数据
       list:[],  
       total:0,
       //订单状态：-1->全部订单；0->待付款；1->待发货；2->待收货；3->待评价；4->已关闭；5->无效订单  
    }
  },
  created(){
      that=this
      this.getItem()
  },
  methods:{
   gobtnText(item){
    //    订单状态：-1->全部订单；0->待付款；1->待发货；2->待收货；3->待评价；4->已关闭；5->无效订单
       switch (item.status) {
           case 0:
               console.log('待付款')
               break;
            case 1:
               console.log('待发货')
               break;
            case 2:
              //查看物流
               console.log('查看物流')
               this.$router.replace('/logistics')
            break;
             case 3:
               console.log('待评价')
            //    console.log(item)
               this.$router.replace('/commetOrder')
            break;
              case 4:
               console.log('删除订单')
            break;
              case 5:
               console.log('无效订单')
            break;
           default:
               break;
       }
   },
   //取消订单
   cancel(item){
      let op ={id :item.id,status:4}
       this.$dialog.alert({
         message: "是否确定取消订单？", //改变弹出框的内容
         showCancelButton: true //展示取水按钮
        })
        .then(() => { //点击确认按钮后的调用
           updateOrder(op).then(res=>{
             item.status=4
             this.$toast('取消成功')
           })
        })
        .catch(() => { //点击取消按钮后的调用
            // console.log("点击了取消按钮")
        })
   },
   //删除订单
   del(item){
       console.log(item)
       this.$dialog.alert({
         message: "是否确定删除订单？", //改变弹出框的内容
         showCancelButton: true //展示取水按钮
        })
        .then(() => { //点击确认按钮后的调用
           removeOrder(item.id).then(res=>{
             this.$toast('删除成功')
             this.list.forEach((ele,index,array)=>{
                if(ele.id==item.id){
                    // console.log('删除ta')
                    array.splice(ele,1)
                }
             })
           })
        })
        .catch(() => { //点击取消按钮后的调用
            // console.log("点击了取消按钮")
        })
   },
   //确定收货
   confim(item){
     console.log(item)
     let op={ id:item.id,status:3, confirmStatus:1}
      this.$dialog.alert({
         message: "是否确定收货？", //改变弹出框的内容
         showCancelButton: true //展示取水按钮
        })
        .then(() => { //点击确认按钮后的调用
           updateOrder(op).then(res=>{
             item.status=3
             this.$toast('确定成功')
           })
        })
        .catch(() => { //点击取消按钮后的调用
            // console.log("点击了取消按钮")
        })
   },
   //得到数据
   getItem(){
     let op={curPage:that.curPage,pageRows:that.pageRows,status:3,orderType :1}
        getOrderType(op).then(res=>{
            // console.log(res.data.rows)
            this.total=res.data.total
            if(this.curPage==1){
                this.list=res.data.rows
            }else{
                this.list=this.list.concat(res.data.rows)
            }
        })
   },
   goDetails(id){
      this.$router.replace(`/orderList/goodsList/${id}`)
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
            that.curPage++
            this.getItem()
            this.loading = false;

            if (this.list.length==0||this.list.length >= this.total) {
               this.finished = true;
            }
        }, 1000);
     }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bugAll{
    position: relative;
    width: 90%;
    margin: 16px  auto;
    padding: 10px;
    box-shadow:0px 0px 4px 0px rgba(0,0,0,0.1);
    border-radius:4px;
}
.title{
    display: flex;
    justify-content: space-between;
}
.title .right{
    color: #FC5650;
}
.content{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
}

.btn{
 margin-top: 12px;
 display: flex;
 justify-content: flex-end;
}
.btn button{
    margin-left:8px;
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
