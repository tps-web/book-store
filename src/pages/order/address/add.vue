<template>
  <div class="">
      <!-- <headerNav title="添加地址" /> --> 
      <!-- 没有数据占位图 -->
      <div class="noDataPlaceHold" v-show="shippingAddress.length<1">
          <van-image width="100" height="100" :src="require('../../../assets/images/noCart.png')" />
          <div style="color:#999">还没有添加地址...</div>
      </div>
      <van-address-list
        v-model="currentAddress.id"
        :list="shippingAddress"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="onBackAddress"
      />
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
        // chosenAddressId:'1',
    }
  },
  computed:{
     ...mapState(['shippingAddress','currentAddress'])
  },
   created(){
    // console.log(this.currentAddress)
  },
   methods: { 
    onAdd() {
      this.$router.push('/edit')
    },
    onEdit(item, index) {
      // this.$toast('编辑地址:' + item.id);
      this.$router.push(`/edit/${item.id}`)
    },
    onBackAddress(item, index){
        this.$store.commit('CHANGE_ADDRESS',item)
        this.$router.back();
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.noDataPlaceHold{
    margin-top: 100px;
}
 /deep/ .van-button--danger{
    color: #000;
    background-color: rgba(255,205,1,1)!important;
    border: 1px solid rgba(255,205,1,1)!important;
}
/deep/ .van-tag{
    color: #000;
    background-color: rgba(255,205,1,1)!important;
    border: 1px solid rgba(255,205,1,1)!important;
}
/deep/ .van-address-item .van-radio__icon--checked .van-icon{
    background-color: rgba(255,205,1,1);
    border-color: rgba(255,205,1,1);
}
</style>
