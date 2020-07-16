<template>
  <div class="">
     <!-- <headerNav title="新增地址"/> -->
     <van-address-edit
        :area-list="areaList"
        show-postal
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @change-detail="onChangeDetail"
      />
  </div>
</template>

<script>
 import { Toast } from 'vant';
 
import areaList from './area';

export default {
  data() {
    return {
      areaList,
      searchResult: [],
    };
  },
  methods: {
    onSave(content) {
      Toast('save');
      // console.log(content.province + content.city + content.county + content.addressDetail)
      let address={
        name:content.name,
        tel:content.tel,
        address: content.province + content.city + content.county + content.addressDetail,
        isDefault:content.isDefault
      }
      this.$store.commit('ADD_ADDRESS',address)
      this.$router.back();
    },
    onChangeDetail(val) {
    	console.log(1)
      //修改详细地址时触发
      //  if (val) {
      //   this.searchResult = [
      //     {
      //       name: '黄龙万科中心',
      //       address: '杭州市西湖区',
      //     },
      //   ];
      // } else {
      //   this.searchResult = [];
      // }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
 .van-button--danger{
    color: #000;
    background-color: rgba(255,205,1,1)!important;
    border: 1px solid rgba(255,205,1,1)!important;
}

</style>

