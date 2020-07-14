<template>
  <div class="">
     <van-tabs v-model="bugActive">
                  <van-tab title="全部订单" name="1-a">全部订单</van-tab>
                  <van-tab title="待付款" name="1-b">待付款</van-tab>
                  <van-tab title="待发货" name="1-c">待发货</van-tab>
                  <van-tab title="待收货" name="1-d">待收货</van-tab>
                  <van-tab title="待评价" name="1-e">待评价 </van-tab>
    </van-tabs>
  </div>
</template>

<script>

export default {
  props:{
       bugActive:{
           type: String,
           required: true
       } 
   },
  data () {
    return {
        
    }
  },
  created(){
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
