<template>
  <div class="">
     <!-- <headerNav title="新增地址"/> -->
     <van-address-edit
        :area-list="areaList"
        show-set-default
        :show-delete="id"
        :addressInfo="addressInfo"
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
  </div>
</template>

<script>
import { Toast } from 'vant';
import {mapActions} from 'vuex'
import areaList from './area';
import {getAddressId,removeAddress} from '@/api'
import {formatAddress} from '@/utils'
export default {
  data() {
    return {
      areaList,
      list:[],
      addressInfo:{},
      searchResult: [],
      id: this.$route.params.id ? true:false,
    };
  },
  watch:{
    addressInfo(oldVal,newVal){
      if(newVal){
        console.log(newVal)
      }
    }
  },
  created(){
    if(this.$route.params.id){
      console.log(this.$route.params.id)
          getAddressId(this.$route.params.id).then(res=>{
            // console.log(res)
            var ele=res.data.item
              var obj={  
                        id: ele.id,
                        name: ele.name,
                        tel: ele.phoneNumber,
                        province:ele.province,
                        city:ele.city,
                        county:ele.region,
                        addressDetail:ele.detailAddress,
                        areaCode:ele.postCode,
                        isDefault: ele.defaultStatus===1?true:false
                      }
              this.addressInfo=obj
          })
    }
   
  },
  methods: {
    ...mapActions(['saveAddress','updateAddress','getALLAddressList']),
    onSave(content) {
      const obj={
        "city": content.city,
        "defaultStatus": content.isDefault ? 1 : 0,
        "detailAddress": content.addressDetail,
        "name": content.name,
        "phoneNumber": content.tel,
        "postCode": content.areaCode,
        "province":content.province,
        "region":content.county
      }
      // console.log(content)
      if(this.$route.params.id){
        //编辑
        obj.id=content.id
        this.updateAddress(obj)
      }else{
        //添加
        this.saveAddress(obj)
      }
      // console.log(content.province + content.city + content.county + content.addressDetail)
      // let address={
      //   name:content.name,
      //   tel:content.tel,
      //   address: content.province + content.city + content.county + content.addressDetail,
      //   isDefault:content.isDefault
      // }
      // this.$store.commit('ADD_ADDRESS',address)
      this.$router.back();
    },
    onDelete(content){
      removeAddress(content.id).then(res=>{
        console.log(res)
        this.$toast('删除成功')
        this.getALLAddressList()
        this.$router.back();
      })
    },
    onChangeDetail(val) {
    	// console.log(1)
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
 /deep/ .van-button--danger{
   /* position:absolute;
   bottom: 0;
   left: 0; */
    color: #000;
    background-color: rgba(255,205,1,1)!important;
    border: 1px solid rgba(255,205,1,1)!important;
}

</style>

