<template>
  <div class="content">
    <div class="selectRadioBox">
      <van-radio-group v-model="radio">
          <van-radio v-for="(item,index) in reasonList" :key="index"  :name="item.name" class="radioBox" >{{item.name}}</van-radio>
      </van-radio-group>
       <van-cell-group v-if="radio=='其他问题'">
         <van-field v-model="value" placeholder="请输入问题" type="textarea" autosize rows="2" class="filedBox" />
       </van-cell-group>
     </div>
     <div class="btn"   v-show="hidshow">
        <van-button type="primary" size="large" @click="goReturn">申请退款</van-button>
     </div>
  </div>
</template>

<script>
var that
import {orderReason,returnApply,updateOrder} from '@/api'
export default {
  name:'refund',
  data () {
    return {
      docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
      showHeight: document.documentElement.clientHeight,   //实时屏幕高度
      hidshow:true,  //显示或者隐藏footer
      bookItem:this.$route.query,
      reasonList:'',
      radio:null,
      value:""
    }
  },
  created(){
    that=this
    orderReason().then(res=>{
      this.reasonList=res.data.rows
      // console.log(this.reasonList)
    })
    // console.log(this.$route.query.item)
  },
 mounted(){
    // window.onresize监听页面高度的变化
    window.onresize = ()=>{
        return(()=>{
           that.showHeight= window.innerHeight;
        })()
    }
  },
  watch:{
    showHeight(){
        if(that.docmHeight > that.showHeight){
            that.hidshow=false
        }else if(that.docmHeight == that.showHeight){
          that.hidshow=true
        }
     }
  },
  methods:{
    goReturn(){
      // console.log(this.radio)
      if(this.radio!=null){
         this.$dialog.alert({
                    message: "是否确定退款？", //改变弹出框的内容
                    showCancelButton: true //展示取水按钮
                })
                .then(() => { //点击确认按钮后的调用
                   let op={
                      bookCount:this.$route.query.item.list.length,
                      bookPrice:this.$route.query.item.totalAmount,
                      bookRealPrice:this.$route.query.item.payAmount,
                      orderId:this.$route.query.item.id,
                      orderSn:this.$route.query.item.orderSn,
                      reason:this.radio,
                      receiveMan:this.$route.query.item.receiverName,
                      returnPhone:this.$route.query.item.receiverPhone,
                      returnAmount:this.$route.query.item.payAmount,
                      status:0,
                      returnName:this.$route.query.item.receiverName,
                      userNickName:this.$route.query.item.userNickName,
                      remark:this.value
                   }
                  //  console.log(op)
                    returnApply(op).then(res=>{
                       console.log(res)
                       //更新订单状态 为退款
                         let op={id:this.$route.query.item.id,status:6}
                          updateOrder(op).then(res=>{
                              // console.log(res)
                              history.back();
                          })
                    })
                })
                .catch(() => { //点击取消按钮后的调用
                    // console.log("点击了取消按钮")
                })
              }else{
                this.$toast('请选择原因')
              }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
  width: 96%;
  margin: 10px auto;
  display: flex;
}

.imgBox{
  width: 55px;
  height: 65px;
  display:-webkit-flex;
  display:flex;
  -webkit-flex-flow : column nowrap;
  flex-flow : column nowrap;
  padding: 4px;
}
.goodsImg{
   width: 100%;
   margin-left : auto;
   margin-right : auto;
   margin: auto;
}
.bookDesc{
  text-align: left;
  padding: 6px;
}
.bookPrice{
  color: red;
  margin-top: 6px;
}
.selectRadioBox{
  width: 90%;
  margin: 20px auto;
}
.radioBox{
  margin: 20px 6px;
}
.btn{
  width: 100%;
  position: absolute;
  bottom: 0;
}
</style>