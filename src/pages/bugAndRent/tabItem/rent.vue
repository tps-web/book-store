<template>
  <div class="">
     <van-tabs v-model="rentActive">
                  <van-tab title="全部订单" name="a">全部订单</van-tab>
                  <van-tab title="待归还" name="b">待归还</van-tab>
                  <van-tab title="待评价" name="c">待评价</van-tab>
                  <van-tab title="已取消" name="d">已取消</van-tab>
     </van-tabs>
  </div>
</template>

<script>

export default {
   props:{
     rentActive:{
           type: String,
           required: true
     },
    },
  data () {
    return {
       
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
