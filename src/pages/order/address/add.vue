<template>
  <div class="">
      <headerNav title="添加地址" />
      <!-- 没有数据占位图 -->
      <div class="noDataPlaceHold" v-show="list.length<1">
          <van-image width="100" height="100" :src="require('../../../assets/images/noCart.png')" />
          <div style="color:#999">还没有添加地址...</div>
      </div>
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="onBackAddress"
      />
  </div>
</template>

<script>

export default {
  data () {
    return {
        chosenAddressId:0,
        list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
          isDefault: true,
        },
        {
          id: '2',
          name: '李四',
          tel: '1310000000',
          address: '浙江省杭州市拱墅区莫干山路 50 号',
        },
      ],
    }
  },
   methods: {
    onAdd() {
      this.$toast('新增地址');
    },
    onEdit(item, index) {
      this.$toast('编辑地址:' + index);
    },
    onBackAddress(item, index){
        console.log(item)
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
</style>
