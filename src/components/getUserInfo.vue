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
     window.isTrue = false
  },
  mounted(){
     window.androidCallJs = this.androidCallJs;
     window.isTrue = false
     androidCallJs(169)  
    //  androidCallJs(200)  
  },
 methods:{
   iOSCallJs(id){
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
              //  return "用户得到"
         }else{
                // return "请求过了"
         }
     }else{
       //没有id 
        this.$router.replace('/')
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
                  // isTrue=true
                  //  alert(UserMember.data.item.data.userId)
                  store.commit('GETMEMBERINFO',UserMember.data.item.data)
                  this.$router.replace('/')
                  // this.$router.push('/')
              }))
               return "用户得到"
            }else{
                return "请求过了"
            }
      }
      else{
          // setToken(info.data)
          // getUserMemberById(info.data.item.userId).then(res=>{
          //     store.commit('GETMEMBERINFO',res.data.item.data)
          // })
          // store.dispatch('getUserInfo')
          this.$router.replace('/')
      }
  },
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
