<template>
  <div class="">
      <!-- 选择收货地址-->
      <div class="address" v-if="addressExpess===''">
          <div class="addIcon" @click="selectAddress">
            <van-image :src="require('../../assets/images/address.png')" width="26" height="26" style="margin-top:14px"/>
            <div>请添加寄件地址</div>
          </div>
      <div class="line"></div>
      </div>
      <div class="currentAddress" v-else @click="selectAddress">
        <div class="left">
          <van-icon name="location" size="40" color="#FFCD01" />
        </div>
        <div class="content"> 
            <div class="defaultName">{{addressExpess.name}}<span class="tel">{{addressExpess.tel}}</span> <span v-show="addressExpess.isDefault"><van-tag round type="primary">默认</van-tag></span></div>
            <div style="margin-top:4px">{{addressExpess.address}}</div>
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
    ...mapState(['addressExpess']),
  },
  methods:{
     selectAddress(){
        this.$router.push('/selectAddress');
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.address{
    width: 96%;
    margin: 16px auto;
    height: 80px;
    position: relative;
}
.currentAddress{
    width: 95%;
    position: relative;
    margin: 16px auto;
    height: 80px;
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
  flex: 1.5;
}
.line{
    position: absolute;
    bottom: 0;
    width:100%;
    height: 2px;
    background: repeating-linear-gradient(-45deg,#ff6c6c 0,#ff6c6c 5%,transparent 6% ,transparent 7%,#1989fa 0,#1989fa 12%,transparent 13%,transparent 16%);
}
</style>
