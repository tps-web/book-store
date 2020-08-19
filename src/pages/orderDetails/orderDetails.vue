<template>
  <div class="">
      <div class="top">
          <van-image :src="require('../../assets/images/top.png')" class="top_img"/>
           <div class="top_tit">{{listItem|formatStatus}}
              <span style="margin-left:20px;font-size:14px">{{lastPayTime}}</span>
           </div>
      </div>
      <!-- 运输 -->
       <!-- <div class="expess">
          <van-image :src="require('../../assets/images/goods.png')" class="expess_img"/>
          <div class="content">
              <div class="content_top">运输中</div>
              <div class="content_botton">快件由【广东中山运转中心】发往【广东中转...</div>
          </div>
          <van-icon name="arrow" class="expess_right" size="20" />
       </div> -->
       <!-- 联系人 -->
       <div class="expess">
          <van-image :src="require('../../assets/images/posi.png')" class="expess_img"/>
          <div class="content">
              <div class="content_top">
                  <span>{{listItem.receiverName}}</span>
                  <span class="tel">{{listItem.receiverPhone}}</span>
              </div>
              <div class="content_botton">{{listItem.receiverDetailAddress}}</div>
          </div>
       </div>
     <selectGoods :goodsList='goodsList' />
     <div v-show="listItem.orderType===0">
         <van-cell title="商品金额" :value="formatTwo(listItem.totalAmount)" size="large" title-style="text-align: left;font-size: 14px;" />
         <van-cell title="商品优惠" :value="jian(listItem.totalAmount,listItem.payAmount,listItem.couponAmount)" size="large" title-style="text-align: left;font-size: 14px;"/>
         <van-cell title="优惠券" :value="formatTwo(listItem.couponAmount)" size="large" title-style="text-align: left;font-size: 14px;"/>
         <div class="total">支付金额：<span style="color:red">￥{{listItem.payAmount}}</span></div>
     </div>
      <!-- 订单号信息 -->
      <div class="orderBox">
          <div class="left">
            <div class="orderId">订单编号:{{listItem.orderSn}}</div>
            <div class="orderDate">订单创建时间：{{listItem.createTime}}</div>
          </div>
          <div class="right">
              <van-button plain type="info" round size="small" class="copeBtn" @click="cope(202007083451452)">复制</van-button>
          </div>
      </div>
      <!-- 物流信息 -->
      <!-- <div class="expressBox">
            <div class="expessName">发货物流公司：{{listItem.deliveryCompany}}</div>
            <div class="expessNum">发货物流单号：{{listItem.deliverySn}}</div>
      </div> -->
      <div class="bottom">
            <van-button plain type="default" round size="small" class="btn" @click="goPay(listItem)" v-show="listItem.status==0" >去付款</van-button>
            <van-button plain type="default" round size="small" class="btn" @click="goExpress(listItem)" v-show="listItem.status==2" >查看物流</van-button>
            <van-button plain type="default" round size="small" class="btn" @click="goComment(listItem)" v-show="listItem.status==4" >去评价</van-button>
            <van-button plain type="danger" round size="small" class="btn"  @click="goDelete(listItem)" v-show="listItem.status==5||listItem.status==6">删除订单</van-button>
      </div>
    <van-dialog v-model="show" title="支付订单" confirmButtonText="去支付"  @confirm="confirm()" :before-close="onBeforeClose">
      <van-icon name="close" size="24" class="close" @click="closeBtn"/>
         <div class="payNum">￥{{item.payAmount}}</div>
         <van-radio-group v-model="radio" class="radioBox">
            <van-radio name="2"  class="payBtn">
                <van-image :src="require('../../assets/images/wxpay.png')" class="payImg"/>
                 <span class="payText">微信支付</span>
            </van-radio>
            <!-- <van-radio name="1"  class="payBtn">
              <van-image :src="require('../../../assets/images/zfbpay.png')" class="payImg"/>
                <span class="payText">支付宝支付</span>
            </van-radio> -->
         </van-radio-group>
     </van-dialog>
  </div>
</template>

<script>
import selectGoods from './goodsList'
import {getOrderDesc,updateOrder,removeOrder,wxPay} from '@/api'

export default {
  components:{
      selectGoods
  },
  data () {
    return {
        show:false,
        radio:'2',
        listItem:'',
        goodsList:'',
        createdTime:'',
        lastPayTime:'',
        item:'',
    }
  },
  created(){
      getOrderDesc(this.$route.params.id).then(res=>{
          console.log(res.data.item)
          this.goodsList=res.data.item.list
          this.listItem=res.data.item
             var statusText=this.getStatus(this.listItem.status)
             document.title=statusText
          if(this.listItem.status===0){
               this.createdTime=res.data.item.createTime
               this.computedLastPayTime()
           }
      })
    
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
   //安卓调用支付结果
    // androidPayResult(result){
    //         //0 成功  非0 失败
    //         if(result==0){
    //         this.$router.replace({
    //             path: '/success',
    //             query:{
    //                 id:this.item.id
    //             }
    //         })
    //         }else{
    //         this.$router.replace({
    //             path: '/fail',
    //             query:{
    //                 id:this.item.id
    //             }
    //         })
    //         }
    //     },
      onBeforeClose(action, done){
       if (action === "confirm") {
            return done(false);
        }else{
            return done();
            this.radio=2
        }
      },
      confirm(){
        let op={id:this.item.id,payType:this.radio}
        updateOrder(op).then(res=>{
            console.log(res)
        })
        wxPay(this.listItem.orderSn).then(res=>{
            var op =JSON.stringify(res.data.item)
             sessionStorage.setItem('orderId',this.item.id)
            window.android.androidToPay(op);
            this.show=false
         })
      },
      closeBtn(){
         this.show=false
      },
      computedLastPayTime(){
          var auth_timetimer = setInterval(()=>{
               let createTime = Date.parse(this.createdTime) / 1000;
               let endTime  = createTime + 1800;
               let clientTime = Date.parse(new Date()) / 1000;
               let lastTime = endTime - clientTime;
               let int_minute;
            if(lastTime > 0){
                int_minute = Math.floor(lastTime/60);
                lastTime -= int_minute * 60;
                this.lastPayTime = int_minute+'分'+ lastTime +'秒'
             } else {
                 this.lastPayTime='支付时间超时'
                 let op = { id: this.listItem.id, status: 5 }
                 updateOrder(op).then(res=>{
                    //  console.log(res)
                    this.listItem.status=5
                 })
                 clearInterval(auth_timetimer);
             } 
          },1000)
      },
      getStatus(orderType){
            switch (orderType) {
                                 case 0:
                                   return '待付款'
                                break;
                                case 1:
                                    return '待发货'
                                break;
                                case 2:
                                    return '待收货'
                                break;
                                case 3:
                                    return '待归还'
                                break;
                                case 4:
                                    return '待评价'
                                break;
                                case 5:
                                    return '已关闭'
                                break;
                                default:
                                    break;
                            }
      },
    goPay(item){
        //去付款
        this.item=item
        console.log(item)
        this.show=true
        //  window.android.androidToPay(JSON.stringify(item));  //js 调用android
    },
    //去评价
    goComment(item){
            // path: '/goodsComment/:id',
      this.$router.push(`/goodsComment/${item.id}`)
    },
    //返回
   goBack(){
        var path=sessionStorage.getItem('path')
        var pathChildren= sessionStorage.getItem('pathChildren')
        this.$router.replace({path: `/bugAndRent/${path}/${pathChildren}`});
    //replace替换原路由，作用是避免回退死循环
  },
  //删除
  goDelete(item){
        this.$dialog.alert({
            message: "是否确定删除订单？", //改变弹出框的内容
            showCancelButton: true //展示取水按钮
        })
        .then(() => { //点击确认按钮后的调用
            removeOrder(item.id).then(res => {
                this.$toast('删除成功')
                history.back();
                // this.list.forEach((ele, index, array) => {
                //     if (ele.id == item.id) {
                //         array.splice(ele, 1)
                //     }
                // })
            })
        })
        .catch(() => { //点击取消按钮后的调用
            // console.log("点击了取消按钮")
        })
    },
      //保留两位小数
    formatTwo(num){
        if(num!=null || undefined){
            return num.toFixed(2)
        }else{
            var str=0
            return str.toFixed(2)
        }
    },
    jian(arg1, arg2,arg3) {
        var newArg3 = arg3 == null || undefined ? 0 : arg3
        var r1, r2,r3, m;
        try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
        try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
        try { r3 = arg3.toString().split(".")[1].length } catch (e) { r3 = 0 }
        m = Math.pow(10, Math.max(r1, r2,r3))
        return ((arg1 * m - arg2 * m - newArg3 * m) / m).toFixed(2)
    },
      cope(num){
          console.log(num)
          const input = document.createElement('input')
          document.body.appendChild(input)
          input.setAttribute('value', num)
          input.select()
           if (document.execCommand('copy')) {
                document.execCommand('copy')
                this.open2()
            }
            document.body.removeChild(input)
      },
      open2() {
          this.$toast('复制成功')
      },
      goExpress(item){
        //   console.log(item.id)
         this.$router.push(`/logistics/${item.id}`)
      }
  },
  filters:{
        //订单状态：-1->全部订单；0->待付款；1->待发货；2->待收货；3->待评价；4->已关闭；5->无效订单  
      formatStatus(order){
        //   if(order.orderType==0){
            switch (order.status) {
                    case 0:
                        return '待付款'
                    break;
                    case 1:
                        return '待发货'
                    break;
                    case 2:
                        return '待收货'
                    break;
                    case 3:
                        return '待归还'
                    break;
                    case 4:
                        return '待评价'
                    break;
                      case 5:
                        return '已关闭'
                    break;
                    default:
                        break;
                }
        //   }else{
        //       //借书
        //     switch (order.status) {
        //         case 0:
        //             return '待付款'
        //         break;
        //         case 1:
        //             return '待发货'
        //         break;
        //         case 2:
        //             return '待收货'
        //         break;
        //         case 3:
        //             return '待评价'
        //         break;
        //         case 4:
        //             return '已关闭'
        //         break;
        //         default:
        //             break;
        //     }
        //   }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top{
  position: relative;
  top: 0;
  left: 0;
}
.top_img{
    width: 100%;
    height: 70px;
}
.top_tit{
    position:absolute;
    bottom: 25px;
    left: 20px;
    font-size: 20px;
    font-weight: 500;
    color:rgba(34,34,34,1);
}
.expess{
    width: 90%;
    height: 50px;
    overflow: hidden;
    margin: 16px auto;
    padding: 12px;
    display:flex;
    box-shadow:0px 0px 4px 0px rgba(0,0,0,0.1);
    border-radius:4px;
    /* justify-content: space-between; */
}
.expess_img{
    width: 26px;
    height: 26px;
    margin: auto 0;
}
.content{
    flex: 8;
    text-align: left;
    margin: auto 10px;
}
.content_top{
    font-weight:700;
    color:rgba(34,34,34,1);
}
.content_botton{
    margin-top: 6px;
    font-size: 12px;
    height: 20;
}
.expess_right{
    margin: auto 0;
}
.tel{
    color: #999;
    margin-left: 2px;
}
.total{
    width: 90%;
    margin: 0 auto;
    padding: 16px 6px;
    text-align: right;
    border-bottom: 1px solid #ebedf0;
}

.orderBox{
    width: 92%;
    padding: 10px 8px;
    box-shadow:0px 0px 4px 0px rgba(0,0,0,0.1);
    border-radius:4px;
    margin: 16px auto;
    text-align: left;
    display: flex;
    justify-content: space-between;
}
.left{
    width: 82%;
    color: #999;
    font-size: 12px;
    margin: 6px 4px; 
}
.left .orderDate{
    margin-top: 10px;
}
.right{
    width: 18%;
    margin-top: 8px;
}
.copeBtn{
    height: 20px;
    padding: 8px 12px;
}

.expressBox{
    width: 92%;
    padding: 10px 8px;
    box-shadow:0px 0px 4px 0px rgba(0,0,0,0.1);
    border-radius:4px;
    margin: 16px auto;
    text-align: left;
    color: #999;
    font-size: 12px;
}
.expessNum{
    margin-top: 8px;
}
.bottom{
    float: right;
    margin-right: 10px;
    margin-bottom: 10px;
}
.btn{
    height: 30px;
    margin: 4px;
}
.close{
  position:absolute;
  right: 20px;
  top: 20px;
}
.payImg{
  width: 24px;
  height: 24px;
  position: relative;
  top: 6px;
}
.radioBox{
  width: 96%;
  margin: 0px auto;
  position: relative;
}
/deep/ .van-radio__icon{
    position: absolute!important;
    right: 10px!important;
}
.payText{
  display: inline-block;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  margin-left: 2px;
}
.payNum{
  width: 100%;
  margin: 6px 0;
  height: 40px;
  line-height: 40px;
  color: #3080AA;
  font-size: 24px;
}
</style>
