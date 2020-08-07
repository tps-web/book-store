<template>
  <div class="">
    <addAddress ref="currentAddress"/>
    <goods ref="goods"/>
    <!-- <express ref="express"/> -->
    <!-- 备注 -->
       <div class="remark">
         <van-field v-model="remarkValue" label="备注留言" placeholder="选填，请先和平台协商一致" ref='field'/>
       </div>
     <div class="btn" v-show="hidshow">
        <van-button type="danger"  size="large" @click="godesc">提交订单</van-button>
     </div>
  </div>
</template> 

<script>
import addAddress from '@/components/addAddress/addAddress'
import goods from '@/components/goods/goods'
// import express from '@/components/express/express'
import { getToken } from '@/utils/authcookie'
import {postOrder} from '@/api'
import {formatGoods} from '@/utils'
import {  mapActions } from 'vuex'

export default {
  components:{
        addAddress,
        goods,
        // express
   },
  data () {
    return {
      remarkValue:'', //备注
      hidshow:true,  //显示或者隐藏footer
      docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
      showHeight: document.documentElement.clientHeight,   //实时屏幕高度
      newList:''
    }
  },
  mounted(){
    // window.onresize监听页面高度的变化
    window.onresize = ()=>{
        return(()=>{
            // this.showHeight = document.body.clientHeight;
         this.showHeight= window.innerHeight;
        })()
    }
  },
  created(){
  },
  mounted(){
  },
   watch:{
    showHeight(newVal,oldVal){
        if(this.docmHeight > this.showHeight){
            this.hidshow=false
        }else if(this.docmHeight == this.showHeight){
          this.hidshow=true
        }
     }
  },
  methods:{
     ...mapActions(['getCartList']),
    //格式化商品
    formatGoods(list){
      //  console.log(list)
       const data=formatGoods(list)
      //  console.log(data)
       this.newList=data
    },
      //发货时间
   formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
   },
   //提交订单
    godesc(){
        let op={
            currentAddress:this.$refs.currentAddress.currentAddress,
            goods:this.$refs.goods.goods,
            // date:this.$refs.express.date,
            // date:this.$refs.express.date||this.formatDate(new Date()),
            // expressValue:this.$refs.express.expressValue,
            // dateQuantum:this.$refs.express.dateQuantum,
            remarkValue:this.remarkValue
        }
        this.formatGoods(op.goods)
       if(!op.currentAddress){
           this.$toast('请填写地址')
       }else{
          var info = JSON.parse(getToken())
            var data={
              // "deliveryCompany": op.expressValue.expressName, // 物流名
              // "deliverySn":op.expressValue.expressId,    //物流id
              "status":1,   // 订单状态：-1->全部订单；0->待付款；1->待发货；2->待收货；3->待评价；4->已关闭；5->无效订单
              "confirmStatus":"0", // 确定收货
              "orderType": 1,   //订单类型 1 为借阅
              "receiverCity": op.currentAddress.city,   
              "receiverDetailAddress": op.currentAddress.address,
              "receiverName": op.currentAddress.name,
              "receiverPhone": op.currentAddress.tel,
              "receiverPostCode": op.currentAddress.postCode,
              "receiverProvince": op.currentAddress.province,
              "receiverRegion": op.currentAddress.region,
              "remark": op.remarkValue,
              "sourceType": 1,
              "userId": info.userId,
              "userNickName": info.userNickName
             }
            data.list=this.newList
            this.$dialog.alert({
                  message: "确定提交？", //改变弹出框的内容
                  showCancelButton: true //展示取水按钮
                })
              .then(() => { //点击确认按钮后的调用
                // console.log(data)
                postOrder(data).then(res=>{
                    // console.log(res)
                    this.getCartList()
                    this.$router.push('/rentPay/succesc')
                })
              })
              .catch(() => { //点击取消按钮后的调用
                  console.log("点击了取消按钮")
          })
        }  
    },
    // ifKong(op){
        // if(!op.currentAddress){
        //     // return '请选择地址'
        //     return false
        // }else if(op.goods.length==0){
        //     // return '没有商品'
        //     return false
        // }else if(!op.expressValue){
        //     // return '没有选择快递'
        //     return false
        // }else if(!op.dateQuantum){
        //     // return '请选择租时间段'
        //     return false
        // }else {
        //     return true
        // }
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.remark{
    margin-top: 20px;
}
.btn{
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
}
</style>
