<template>
  <div class="">
     <Skeleton v-show="isShowLoading" />
  </div>
</template>

<script> 
import Skeleton from './skeleton/index'
import { setToken, getToken } from '@/utils/authcookie'
import store from '@/store'
import {getUserInfoById,getUserMemberById} from '@/api'
import axios from 'axios'

 var info = {
      success: true,
      code: 20000,
      message: "成功",
      data: {
      item: {
      userId: 169,
      userCode: "",
      userTelphone: "18813580769",
      userPassword: "",
      userRegistDatetime: "2020-04-07 10:30:55",
      regId: "",
      alias: "uid_169",
      tag: "",
      birthday: "",
      hasBindQq: 0,
      hasBindWeixin: 0,
      hasBindApple: 0,
      isThreeLogin: 0,
      myqrcode: "",
      phoneDeviceCode: "",
      phoneDeviceName: "",
      phoneDeviceType: "android",
      sex: 0,
      status: 0,
      area: "",
      userEmail: "",
      userHead: "http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png",
      userNickName: "ps",
      userSign: "",
      longitude: 0,
      latitude: 0,
      loginStatus: 1,
      updateTime: "",
      isRealUser: 0,
      background: "",
      soundType: 0,
      isFollow: 0,
      wxNickName: "",
      wxUserHead: "",
      qqNickName: "",
      qqUserHead: "",
      worksCount: 0,
      type: 0,
      memberFlag:4
      }
  }
}
export default {
  components:{
    Skeleton
  },
  data () {
    return {
      isShowLoading:true
    }
  },
  created(){
     window.androidCallJs = this.androidCallJs;
     window.iOSCallJs =this.iOSCallJs
  },
  mounted(){
     window.androidCallJs = this.androidCallJs;
     window.isTrue = false
     androidCallJs()
  },
 methods:{
   iOSCallJs(id){
       if(!isTrue){
              axios.all([getUserInfoById(id),getUserMemberById(id)])
              .then(axios.spread((UserInfo,UserMember)=>{
                    // alert(UserInfo.data.item.userId)
                  setToken(UserInfo.data)
                  store.dispatch('getUserInfo')
                  isTrue=true
                  //  alert(UserMember.data.item.data.userId)
                  store.commit('GETMEMBERINFO',UserMember.data.item.data)
                  this.$router.replace('/')
            }))
               return "用户得到"
         }else{
                return "请求过了"
         }
   },
    androidCallJs(id){
      if(id){
          if(!isTrue){
              axios.all([getUserInfoById(id),getUserMemberById(id)])
              .then(axios.spread((UserInfo,UserMember)=>{
                    // alert(UserInfo.data.item.userId)
                  setToken(UserInfo.data)
                  store.dispatch('getUserInfo')
                  isTrue=true
                  //  alert(UserMember.data.item.data.userId)
                  store.commit('GETMEMBERINFO',UserMember.data.item.data)
                  this.$router.replace('/')
              }))
               return "用户得到"
            }else{
                return "请求过了"
            }
      }else{
          setToken(info.data)
          getUserMemberById(info.data.item.userId).then(res=>{
              store.commit('GETMEMBERINFO',res.data.item.data)
          })
          store.dispatch('getUserInfo')
          this.$router.replace('/')
      }
  },
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
