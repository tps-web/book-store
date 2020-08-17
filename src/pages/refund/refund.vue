<template>
  <div class="content">
    <!-- <div class="box">
      <div class="imgBox">
        <van-image  class="goodsImg"  :src="bookItem.bookPic" />
      </div>
     <div class="bookDesc">
       <div class="bookName">{{bookItem.bookName}}</div>
       <div class="bookPrice">￥{{bookItem.realAmount}}</div>
     </div>
    </div> -->
    <div class="selectRadioBox">
      <van-radio-group v-model="radio">
          <van-radio v-for="(item,index) in reasonList" :key="index"  :name="item.id" class="radioBox" >{{item.name}}</van-radio>
      </van-radio-group>
       <van-cell-group v-if="radio==9">
         <van-field v-model="value" placeholder="请输入问题" type="textarea" autosize rows="2" class="filedBox" />
       </van-cell-group>
     </div>
     <div class="btn">
        <van-button type="primary" size="large" @click="goReturn">确定退款</van-button>
     </div>
      <!-- {{$route.query}} -->
  </div>
</template>

<script>
import {orderReason,returnApply} from '@/api'
export default {
  name:'refund',
  data () {
    return {
      bookItem:this.$route.query,
      reasonList:'',
      radio:null,
      value:""
    }
  },
  created(){
    orderReason().then(res=>{
      this.reasonList=res.data.rows
      // console.log(this.reasonList)
    })
    // console.log(this.$route.query.item)
  },

  methods:{
    goReturn(){
      if(this.radio!=null){
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
          // console.log(op)
          returnApply(op).then(res=>{
            console.log(res)
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