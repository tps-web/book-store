<template>
  <div class="content">
      <div class="top">
          <van-image :src="require('../../assets/images/top.png')" class="top_img"/>
          <div class="top_tit">
              退货详情
           </div>
       </div>
        <!-- <div class="title">处理流程</div> -->
        <van-steps :active="active" class="stepsBox">
                <!-- 申请状态：0->待处理；1->退货中；2->已完成；3->已拒绝 -->
                <van-step class="boxItem">待处理</van-step>
                <van-step  class="boxItem">退货中</van-step>
                <div v-show="active!=3&&active!=4">
                <van-step  class="boxItem">已完成</van-step>
                </div>
                <div v-show="active==3">
                <van-step  class="boxItem">已拒绝</van-step>
                </div>
                <div v-show="active==4">
                <van-step  class="boxItem">已关闭</van-step>
                </div>
        </van-steps>
       <selectGoods :goodsList='orderDesc.list' />
        <div class="contentItem clearfix">
            <div class="item"><span>订单编号: {{desc.orderSn}}</span></div>
            <div class="item"><span>下单时间: {{orderDesc.createTime}}</span></div>
            <div class="item"><span>申请时间: {{desc.createTime}}</span></div>
            <div class="ReturnAmountItem">退款金额<span class="returnAmount">:￥{{desc.returnAmount}}</span></div>
            <div>
               <van-button type="default" round  @click="cancel"  size="small" class="btn" v-show='active!=4' >取消申请</van-button>
            </div>
        </div>
       
  </div>
</template>

<script>
import {getReturnDesc,getOrderDesc,updateReturnOrder} from '@/api'

import selectGoods from './goodsList'
export default {
  components:{
      selectGoods
  },
  name:'refund',
  data () {
    return {
     active:'',
     orderSn:this.$route.params.id,
     desc:'',
     orderDesc:''
    }
  },
  created(){
      this.init()
  },
  methods:{
     cancel(){
        //  console.log('取消')
          this.$dialog.alert({
                    message: "是否确定取消申请？", //改变弹出框的内容
                    showCancelButton: true //展示取水按钮
                })
                .then(() => { //点击确认按钮后的调用
                let op={id:this.desc.id,status:4}
                   updateReturnOrder(op).then(res=>{
                       console.log(res)
                       this.$toast('取消成功')
                        this.active=4
                   })
                })
                .catch(() => { //点击取消按钮后的调用
                    // console.log("点击了取消按钮")
                })
     },
     init(){
         getReturnDesc(this.$route.params.id).then(res=>{
            console.log(res)
          this.desc=res.data.item
          this.active=res.data.item.status
          getOrderDesc(res.data.item.orderId).then(res1=>{
            console.log(res1)
            this.orderDesc=res1.data.item  
          })
      })
     },
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
.contentItem{
    width: 90%;
    margin: 10px auto;
    padding: 8px;
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.1);
    text-align: left;
    position: relative;
    top: 0;
    left: 0;
}
.contentItem .item{
    margin: 12px 0;
}
.ReturnAmountItem{
    margin-top: 10px;
    text-align: right;
}
.returnAmount{
    color: red;
}
.stepsBox{
    width: 88%;
    margin: 20px auto 10px; 
}
.boxItem{
    text-align: left;
}
.title{
    width: 90%;
    margin: 0 auto;
    text-align: left;
}
.btn{
    margin: 15px 0 4px;
    float: right;
}
.clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
    content: "";
    display: block;
    height: 0;
    clear:both;
    visibility: hidden;
}
.clearfix{
    *zoom: 1;/*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
}

</style>