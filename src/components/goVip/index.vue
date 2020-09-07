<template>
  <div class="">
     
  </div>
</template>

<script>
import {getUserInfoById,getUserMemberById } from '@/api'
import { setToken, getToken } from '@/utils/authcookie'
import store from '@/store'
import axios from 'axios'
export default {
  data () {
    return {
    }
  },
  created(){
     window.androidSentUserIdToJs = this.androidSentUserIdToJs;
    //  this.androidSentUserIdToJs(211)
  },
  mounted(){
     window.androidSentUserIdToJs = this.androidSentUserIdToJs;
  },
  methods:{
    //ios
 iosSentUserIdToJs(id){
      if(id){
        axios.all([getUserInfoById(id),getUserMemberById(id)])
          .then(axios.spread((UserInfo,UserMember)=>{
              // console.log(UserInfo)
              setToken(UserInfo.data)
              store.dispatch('getUserInfo')
              store.commit('GETMEMBERINFO',UserMember.data.item.data)
              if(UserInfo.data.item.memberFlag===0){
                    this.$router.replace('/vip')
              }else{
                    this.$router.replace('/zVip')
              }
          }))
      }else{
             let op = { method: "jsCallIosGetUserId", data: { "value": "" } }
             window.webkit.messageHandlers.jsCallIosGetUserId.postMessage(JSON.stringify(op))
            // window.webkit.messageHandlers.jsCallIosGetUserId.postMessage()
      }
    },
    //android
     androidSentUserIdToJs(id){
      if(id){
        axios.all([getUserInfoById(id),getUserMemberById(id)])
          .then(axios.spread((UserInfo,UserMember)=>{
              // console.log(UserInfo)
              setToken(UserInfo.data)
              store.dispatch('getUserInfo')
              store.commit('GETMEMBERINFO',UserMember.data.item.data)
              if(UserInfo.data.item.memberFlag===0){
                    this.$router.replace('/vip')
              }else{
                    this.$router.replace('/zVip')
              }
          }))
      }else{  
            window.android.jsCallAndroidGetUserId();
            // const u = navigator.userAgent;
            // const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            // const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
            // if (isIOS) {
            //     window.webkit.messageHandlers.ios.jsCallIosGetUserId()
            // } else if (isAndroid) {
            //     window.android.jsCallAndroidGetUserId();
            // }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.desc{
    color: #ccc;
}
</style>
