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
    androidSentUserIdToJs(id){
        alert(id) 
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
