<template>
  <div>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <img src="../../../../assets/images/nodata.png" alt="" width="88"  style="margin-top:50px" v-if="total==0&&finished">
       <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
       >
    <div class="bugAll" v-for="(item,index) in list" :key="index" >
    <div class="title">
        <div class="left">借书订单</div>
        <div class="right">{{item.status|rentStatus}}</div>
    </div>
    <div class="content">
         <!-- 商品列表-->
       <div class="goods"  @click="goDetails(item)">
         <div class="bigBox">
           <div class="box" v-for="(item,index1) in item.list" :key="index1">
             <div class="imgBox">
                <van-image class="goodsImg" :src="item.bookPic" radius="2px" style="box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);"/>
             </div>
             <!-- <van-image class="goodsImg" :src="item.bookPic" radius="6px" style="box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);"/> -->
           </div>
         </div>
          <div class="goods_right">
            共{{item.list.length}}件商品<van-icon name="arrow" class="right_icon" />
          </div>
       </div>
    </div>
    <div class="expireTime" v-show="item.receiveTime!=null&&item.status===3">借阅时间为：{{item.beginTime}} 至 {{item.expireTime}}</div>
    <div class="btn">
        <!-- 提醒发货  确定收货  删除订单  待评论 -->
       <van-button color="#FC5650" size="small" plain round @click="gobtnText(item)" v-if="item.status!=1&&item.status!=5&&item.status!=6&&item.status!=3&&item.status!=7&&item.status!=8">{{item.status|btnText}}</van-button>
       <van-button color="#FC5650" size="small" plain round @click="cancel(item)" v-if="item.status==1||item.status==0">取消订单</van-button>
       <van-button color="#FC5650" size="small" plain round @click="goterm(item)" v-show="item.status==3&&item.isTerm!=1">续  租</van-button>
       <van-button color="#FC5650" size="small" plain round @click="goBug(item)" v-if="item.status==3" style="position: absolute;left:10px">买  断</van-button>
       <van-button color="#FC5650" size="small" plain round @click="ReturnBook(item)" v-if="item.status==3">预约归还</van-button>
       <!-- <van-button color="#FC5650" size="small" plain round @click="ReturnBook(item)" v-if="item.status==7">取消预约取件</van-button> -->
       <van-button color="#FC5650" size="small" plain round @click="del(item)" v-show="item.status==5||item.status==6" >删除订单</van-button>
       <van-button color="#FC5650" size="small" plain round @click="confim(item)" v-show="item.status==2" >确定收货</van-button>
    </div>
  </div>
   </van-list>
  </van-pull-refresh>
  </div>
</template>

<script>
import { getOrderType, updateOrder, removeOrder,updateStatusById,saveTerm } from '@/api'
import {orderMixin} from '../../mixins/mixins'
var that
export default {
   inject: ["reload"], //注入reload方法
    props:['status'],
    mixins: [orderMixin],
    data () {
        return {
        }
    },
   created(){
       that=this
       this.getItem()
  },
  methods:{
    ReturnBook(item){
      //预约归还
       this.$router.push(`/makeExpress/${item.orderSn}`)
    },
    confim(item) {
            let op = { id: item.id, status: 3}
            this.$dialog.alert({
                    message: "是否确定收货？", //改变弹出框的内容
                    showCancelButton: true //展示取水按钮
                })
                .then(() => { //点击确认按钮后的调用
                    updateStatusById(op).then(res => {
                        item.status = 3
                          this.reload()
                        this.$toast('确定成功')
                    })
                })
                .catch(() => { //点击取消按钮后的调用
                    // console.log("点击了取消按钮")
                })
        },
      //买断
      goBug(item){
        // console.log(item)
        // this.$router.push(`/bugRentBook/${item.id}`)
        this.$router.push(`/bugBookRent/${item.id}`)
      },
      //续约
      goterm(item){
          // console.log(item.orderSn)
           this.$dialog.alert({
                    message: "是否要续约多30天？", //改变弹出框的内容
                    showCancelButton: true //展示取水按钮
                })
                .then(() => { //点击确认按钮后的调用
                    let op={orderSn:item.orderSn,termType:0}
                    saveTerm(op).then(res=>{
                      //  console.log(res)
                      this.$toast('续约成功')
                      this.reload()
                    })
                })
                .catch(() => { //点击取消按钮后的调用
                    // console.log("点击了取消按钮")
                })
      },
      cancel(item) {
            let op = { id: item.id, status: 5 }
            this.$dialog.alert({
                    message: "是否确定取消订单？", //改变弹出框的内容
                    showCancelButton: true //展示取水按钮
                })
                .then(() => { //点击确认按钮后的调用
                    updateStatusById(op).then(res => {
                        item.status = 5
                        this.$toast('取消成功')
                    })
                })
                .catch(() => { //点击取消按钮后的调用
                    // console.log("点击了取消按钮")
                })
        },
     gobtnText(item) {
            //    订单状态：-1->全部订单；0->待付款；1->待发货；2->待收货；3->待评价；4->已关闭；5->无效订单
            switch (item.status) {
                case 0:
                    console.log('待付款')
                    console.log(item)
                    this.show=true
                    this.payNum=item.payAmount
                    break;
                case 1:
                    console.log('待发货')
                    break;
                case 2:
                    //查看物流
                    console.log('查看物流')
                    this.$router.replace(`/logistics/${item.id}`)
                    break;
                case 3:
                    console.log('待归还')
                    // console.log(item)
                    // this.backBooks(item)
                    // this.$router.replace(`/goodsComment/${item.id}`)
                    break;
                case 4:
                    this.$router.replace(`/goodsComment/${item.id}`)
                    console.log('待评价')
                    break;
                case 5:
                    console.log('已关闭')
                    break;
                default:
                    break;
            }
        },
        // backBooks(item){
        // //   console.log(item)
        //   let op={id:item.id,status:4}
        // },
         //下拉刷新
        // onLoad() {
        //     setTimeout(() => {
        //         if (this.isLoading) {
        //             this.isLoading = false;
        //         }
        //         this.curPage++
        //             this.getItem()
        //         this.loading = false;
        //         if (this.list.length == 0 || this.list.length >= this.total) {
        //             this.finished = true;
        //         }
        //     }, 1000);
        // },
        //得到数据
        // getItem() {
        //     let op = { curPage: this.curPage, pageRows: this.pageRows, status: this.status, orderType: 1 }
        //     getOrderType(op).then(res => {
        //         this.total = res.data.total
        //         if (this.curPage == 1) {
        //             this.list = res.data.rows
        //         } else {
        //             this.list = this.list.concat(res.data.rows)
        //         }
        //     })
        // },
     getItem(){
      let op={curPage:that.curPage,pageRows:that.pageRows,status:this.status,orderType :1}
      getOrderType(op).then(res=>{
          this.total=res.data.total
             this.dataList=res.data
              // if(this.dataList.rows.length>0){
              //    this.finished = true;
              // }
            if(that.curPage==1){
                this.list=res.data.rows
            }else{
                this.list=this.list.concat(res.data.rows)
            }
      })
  },
  // 下拉加载
   onLoad() {
          // that.curPage++;
          // that.getItem();
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
            if (this.list.length >= this.total) {
               this.finished = true;
            }
        }, 500);
      },
     // 上拉刷新
      onRefresh() {
            that.list=[]
            that.curPage=0
            // 清空列表数据
            this.finished = false;
            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true;
            this.onLoad();
          // this.loading = true;
          // that.list = [];
          // that.curPage = 1;
          //  setTimeout(() => {
          //    that.getItem();
          //  },800)
      },
   },
  filters:{
    rentStatus(val){
     var obj = {
        '-1': '全部订单',
        '0': '待付款',
        '1': '待发货',
        '2': '待收货',
        '3': '待归还',
        '4': '待评价',
        '5': '已关闭',
        '6':'退款',
        '7':'预约取件成功',
        // '8':'取消预约取件'
        '8':'已完成'
    }
    for (var key in obj) {
        if (key == val) {
            return obj[key]
        }
      }
    }
  }
}
</script>
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
    margin-left:10px;
    height: 28px;
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
  height: 85px;
  margin: auto 4px;
}
.imgBox{
  width: 75px;
  height: 85px;
  display:-webkit-flex;
  display:flex;
  -webkit-flex-flow : column nowrap;
  flex-flow : column nowrap;
}
.goodsImg{
   width: 65px;
   margin-left : auto;
   margin-right : auto;
   margin: auto;
  /* height: 75px; */
}
.right_icon{
  position: relative;
  top: 2px;
}
.expireTime{
  text-align: left;
  font-size: 12px;
  margin-left: 10px;
}
</style>
