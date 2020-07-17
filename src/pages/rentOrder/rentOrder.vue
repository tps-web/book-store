<template>
  <div class="">
    <addAddress ref="currentAddress"/>
    <goods ref="goods"/>
    <express ref="express"/>
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
import express from '@/components/express/express'
export default {
  components:{
        addAddress,
        goods,
        express
   },
  data () {
    return {
      remarkValue:'', //备注
      hidshow:true,  //显示或者隐藏footer
      docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
      showHeight: document.documentElement.clientHeight,   //实时屏幕高度
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
    godesc(){
        let op={
            currentAddress:this.$refs.currentAddress.currentAddress,
            goods:this.$refs.goods.goods,
            expressValue:this.$refs.express.expressValue,
            dateQuantum:this.$refs.express.dateQuantum,
            remarkValue:this.remarkValue
        }
        if(this.ifKong(op)){
            console.log(op)
        }else{
            this.$toast('信息填写不全')
        }
    },
    ifKong(op){
        if(!op.currentAddress){
            // return '请选择地址'
            return false
        }else if(op.goods.length==0){
            // return '没有商品'
            return false
        }else if(!op.expressValue){
            // return '没有选择快递'
            return false
        }else if(!op.dateQuantum){
            // return '请选择租时间段'
            return false
        }else {
            return true
        }
    }
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
