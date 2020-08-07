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
       <div class="goods"  @click="goDetails(item.id)">
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
import { getOrderType, updateOrder, removeOrder } from '@/api'
import {orderMixin} from '../../mixins/mixins'
var that
export default {
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
         //下拉刷新
        onLoad() {
            setTimeout(() => {
                if (this.isLoading) {
                    this.isLoading = false;
                }
                this.curPage++
                    this.getItem()
                this.loading = false;

                if (this.list.length == 0 || this.list.length >= this.total) {
                    this.finished = true;
                }
            }, 1000);
        },
        //得到数据
        getItem() {
            let op = { curPage: this.curPage, pageRows: this.pageRows, status: this.status, orderType: 1 }
            getOrderType(op).then(res => {
                // console.log(res.data.rows)
                this.total = res.data.total
                if (this.curPage == 1) {
                    this.list = res.data.rows
                } else {
                    this.list = this.list.concat(res.data.rows)
                }
            })
        },
  },
  filters:{
    rentStatus(val){
      var obj = {
        '-1': '全部订单',
        '0': '待付款',
        '1': '待发货',
        '2': '待收货',
        '3': '待评价',
        '4': '已关闭',
        '5': '无效订单'
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
