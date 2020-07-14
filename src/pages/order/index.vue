<template>
  <div class="">
      <headerNav title="订单" />
      <!-- 选择收货地址 没有默认地址-->
      <div class="address">
          <div class="addIcon" @click="selectAddress">
            <van-image :src="require('../../assets/images/address.png')" width="26" height="26"/>
            <div>添加收件人信息</div>
          </div>
      <div class="line"></div>
      </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      
    }
  },
  methods:{
    selectAddress(){
        this.$router.push('/addAddress');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.address{
    width: 96%;
    margin: 6px auto;
    height: 80px;
    border: 1px solid rebeccapurple;
   position: relative;
}
.line{
    position: absolute;
    bottom: 0;
    width:100%;
    height: 2px;
    background: repeating-linear-gradient(-45deg,#ff6c6c 0,#ff6c6c 5%,transparent 6% ,transparent 7%,#1989fa 0,#1989fa 12%,transparent 13%,transparent 16%);
}
.addIcon{
    margin: 10px 0;
}
</style>
