<template>
  <div class="">
      <!-- <headerNav title="订单" /> -->
      <!-- 选择收货地址 没有默认地址-->
      <div class="address" v-if="defaultAddress===0">
          <div class="addIcon" @click="selectAddress">
            <van-image :src="require('../../assets/images/address.png')" width="26" height="26"/>
            <div>添加收件人信息</div>
          </div>
      <div class="line"></div>
      </div>
      <div class="defaultAddress" v-else>
        <div class="left">
          <van-icon name="location" size="40" color="#FFCD01" />
        </div>
        <div class="content"> 
            <div class="defaultName">{{defaultAddress.name}}<span class="tel">{{defaultAddress.tel}}</span> <span v-show="defaultAddress.isDefault"><van-tag round type="primary">默认</van-tag></span></div>
            <div style="margin-top:4px">{{defaultAddress.address}}</div>
        </div>
        <div class="right">
            <van-icon name="arrow" size="20" />
        </div>
        <div class="line"></div>
      </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed:{
    ...mapGetters({defaultAddress:'DEFAULTADDRESS'}),
  },
  methods:{
    selectAddress(){
        this.$router.push('/addAddress');
    }
  },
  created(){
    // console.log(this.shippingAddress)
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
.defaultAddress{
    width: 96%;
    position: relative;
    margin: 6px auto;
    height: 80px;
    border: 1px solid rebeccapurple;
    display: flex;
}
.left{
  margin: auto 0;
  flex: 2;
}
.content{
  flex: 6;
  margin: auto;
  text-align: left;
}
.defaultName{
  font-weight:500;
  font-size: 14px;
  color:rgba(34,34,34,1);
}
.tel{
  color: #999;
  margin-left: 5px;
}
.right{
  margin: auto 0;
  flex: 2;
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
