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
        <div class="left">购书订单</div>
        <div class="right">
          <div v-show="false">{{test}}</div>
          <span v-show="item.lastTime">{{item.lastTime|formatTime}}</span>
          {{item.status|orderStatus}}
        </div>
    </div>
    <div class="content">
         <!-- 商品列表-->
       <div class="goods"  @click="goDetails(item)">
         <div class="bigBox">
           <div class="box" v-for="(item,index1) in item.list" :key="index1">
             <div class="imgBox">
                <van-image class="goodsImg" :src="item.bookPic" radius="2px" style="box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);"/>
             </div>
           </div>
         </div>
          <div class="goods_right">
            共{{item.list.length}}件商品<van-icon name="arrow" class="right_icon" />
          </div>
       </div>
    </div>
    <div class="btn">
      <!-- <div class="returnId">退款</div> -->
       <van-button color="#FC5650" size="small" plain round @click="returnId(item)" v-if="item.status==4">退货</van-button>
        <!-- 提醒发货  确定收货  删除订单  待评论 -->
       <span class="pay" v-show="item.status==0">￥{{item.payAmount}}</span>
       <van-button color="#FC5650" size="small" plain round @click="gobtnText(item)" v-if="item.status!=1&&item.status!=5&&item.status!=6">{{item.status|btnText}}</van-button>
       <van-button color="#FC5650" size="small" plain round @click="cancel(item)" v-if="item.status==0||item.status==1">取消订单</van-button>
       <!-- <van-button color="#FC5650" size="small" plain round @click="cancel(item)" v-if="item.status!=1&&item.status!=3&&item.status!=4&&item.status!=2&&item.status!=5&&item.status!=6">取消订单</van-button> -->
       <van-button color="#FC5650" size="small" plain round @click="del(item)" v-show="item.status==5" >删除订单</van-button>
       <van-button color="#FC5650" size="small" plain round @click="confim(item)" v-show="item.status==2" >确定收货</van-button>
    </div>
    <van-dialog v-model="show" title="支付订单" confirmButtonText="去支付"  @confirm="confirm()" :before-close="onBeforeClose">
      <van-icon name="close" size="24" class="close" @click="closeBtn"/>
         <div class="payNum">￥{{payItem.payAmount}}</div>
         <van-radio-group v-model="radio" class="radioBox">
            <van-radio name="2"  class="payBtn">
                <van-image :src="require('../../../../assets/images/wxpay.png')" class="payImg"/>
                <span class="payText">微信支付</span>
            </van-radio>
            <!-- <van-radio name="1"  class="payBtn">
              <van-image :src="require('../../../../assets/images/zfbpay.png')" class="payImg"/>
                <span class="payText">支付宝支付</span>
            </van-radio> -->
         </van-radio-group>
     </van-dialog>
  </div>
   </van-list>
  </van-pull-refresh>
  </div>
</template>

<script>
var that,int_minute,lastTime
import {getOrderType,updateOrder,removeOrder,wxPay,updateStatusById} from '@/api'
import {formatList} from '@/utils'
import {orderMixin} from '../../mixins/mixins'

export default {
  props:['status'],
  mixins: [orderMixin],
  data () {
    return {
       createdTime:'',
       curPage: 1, //当前页面
       lastPayTime:'',
       ticker:'',
       show:false,
       radio: '2',
       payItem:'',
       dataList:'',
       test:1200,
       tick:''
       //订单状态：-1->全部订单；0->待付款；1->待发货；2->待收货；3->待评价；4->已关闭；5->无效订单 
      //  订单状态：-1->全部订单；0->待付款；1->待发货；2->待收货；3->待归还；4->待评价；5->已关闭；6->无效订单 
    }
  },
  created(){
      that=this
      // that.list = [];
      this.getItem()
  },
  watch:{
  },
  filters:{
    formatTime(time){
      let min = parseInt(time / 60); //算出分钟数
      let sec = Math.floor(time%60)
      return min+'分'+sec+'秒'
    }
  },
  mounted(){
    //这一段是防止进入页面出去后再进来计时器重复启动
   	  if (this.ticker) {
         clearInterval(this.ticker);
       }
       if (this.tick) {
         clearInterval(this.tick);
       }
      this.beginTimer();
      this.text()
  },
  methods:{  
    // 退款
    returnId(item){
      // console.log(item)
        this.$router.push({
          path: '/refund',
          query:{
            item
          }
        })
    },
   onBeforeClose(action, done){
       if (action === "confirm") {
        return done(false);
       }else{
         return done();
         this.radio=2
       }
    },
    confirm(){
       this.payItem.payType=this.radio
       let op={id:this.payItem.id,payType:this.radio}
       updateOrder(op).then(res=>{
          console.log(res)
       })
      // console.log(this.payItem)
       wxPay(this.payItem.orderSn).then(res=>{
          //  console.log(res.data.item)
           var op =JSON.stringify(res.data.item)
           sessionStorage.setItem('orderId',this.payItem.id)
           sessionStorage.setItem('orderType',0)
           window.android.androidToPay(op);    //js 调用android
        })
    },
    closeBtn(){
      this.show=false
    },
   gobtnText(item) {
            //    订单状态：-1->全部订单；0->待付款；1->待发货；2->待收货；3->待评价；4->已关闭；5->无效订单
            switch (item.status) {
                case 0:
                    console.log('待付款')
                    // console.log(item)
                    this.show=true
                    this.payItem=item
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
                    // console.log('待归还')
                    // console.log(item)
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
        text(){
          this.tick=setInterval(()=>{
            this.test=this.test-1
          },1000)
        },
    beginTimer() { //这个计时器是每秒减去数组中指定字段的时间
	      this.ticker = setInterval(() => {
	        for (let i = 0; i< this.list.length; i++) {
	          const item = this.list[i];
	          if (item.lastTime > 0) {
              this.list[i].lastTime = this.list[i].lastTime - 1;
	          }else{
              if(this.list[i].status===0){
                  let op = { id: that.list[i].id, status: 5 }
                   updateStatusById(op).then(res=>{
                     this.list[i].status=5
                   })
              }
            }
          }
        }, 1000);
	    }, 
   //得到数据
   getItem(){
     let op={curPage:that.curPage,pageRows:that.pageRows,status:this.status,orderType :0}
        getOrderType(op).then(res=>{
            this.total=res.data.total
             this.dataList=res.data
              // if(this.dataList.rows.length>0){
              //    this.finished = true;
              // }
            if(that.curPage==1){
                this.list=formatList(res.data.rows)
            }else{
                this.list=this.list.concat(formatList(res.data.rows))
            }
        })
   },
     cancel(item) {
       if(item.status==0){
            let op = { id: item.id, status: 5 }
            this.$dialog.alert({
                    message: "是否确定取消订单？", //改变弹出框的内容
                    showCancelButton: true //展示取水按钮
                })
                .then(() => { //点击确认按钮后的调用
                    updateStatusById(op).then(res => {
                        item.status = 5
                        item.lastTime=0
                        this.$toast('取消成功')
                    })
                })
                .catch(() => { //点击取消按钮后的调用
                    // console.log("点击了取消按钮")
                })
          }else{
            //代发货
            this.$dialog.alert({
                    message: "是否确定取消订单？", //改变弹出框的内容
                    showCancelButton: true //展示取水按钮
              })
             .then(() => { //点击确认按钮后的调用
                     this.$router.push({
                      path: '/refund',
                      query:{
                        item
                      }
                    })
                })
             .catch(() => { //点击取消按钮后的调用
                    // console.log("点击了取消按钮")
              })
          }
        },
    // 上拉加载
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
            if (this.list.length >= this.total) {
               this.finished = true;
            }
        }, 500);
     },
       // 上拉刷新
        onRefresh() {
            that.curPage=0
            that.list=[]
            // 清空列表数据
            this.finished = false;
            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true;
            this.onLoad();
        },
  },
   beforeDestroy(){
         clearInterval(this.ticker);
         clearInterval(this.test);
   }
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
   width: 100%;
   margin-left : auto;
   margin-right : auto;
   margin: auto;
}
.right_icon{
  position: relative;
  top: 2px;
}
.pay{
  height: 32px;
  line-height: 32px;
  padding: 0 4px;
  color: #FC5650;
  border-radius: 14px;
}
.radioBox{
  width: 96%;
  margin: 0px auto;
  position: relative;
}
.payNum{
  width: 100%;
  margin: 6px 0;
  height: 40px;
  line-height: 40px;
  color: #3080AA;
  font-size: 24px;
}
.payImg{
  width: 24px;
  height: 24px;
  position: relative;
  top: 6px;
}
.payText{
  display: inline-block;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  margin-left: 2px;
}
.payBtn{
  width: 96%;
  padding: 6px;
  background: #f5f5f5;
  margin: 8px auto;
  margin-bottom: 20px;
  border-radius: 6px;
}
.close{
  position:absolute;
  right: 20px;
  top: 20px;
}

/deep/ .van-radio__icon{
    position: absolute!important;
    right: 10px!important;
}
</style>
