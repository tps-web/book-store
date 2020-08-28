<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>
 
                 
<script>
import { mapActions,mapState} from 'vuex'
// import './assets/css/common.css';
import { getToken,setToken } from '@/utils/authcookie'
import {currentDate,currentDateLater,expireTimeDateLater} from '@/utils'
import {getUserMemberById, getOrderDesc,saveMember,updateMember,getUserInfoById} from '@/api'
import store from '@/store'
import axios from 'axios'
export default {
  name: 'App',
   provide () {
    return {
      reload: this.reload,
      newExpireTime:'',
      op:''
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  created(){
     window.androidPayResult = this.androidPayResult;
     window.iosPayResult = this.iosPayResult;
  },
    computed:{
    ...mapState(['userInfo']),
    },
  mounted(){
        //安卓调用支付结果
     window.androidPayResult = this.androidPayResult;
     window.iosPayResult = this.iosPayResult;
  },
    methods: {
    ...mapActions(['getCartList','getUserInfo']),
         //安卓调用支付结果
    androidPayResult(result){
         this.getCartList()
         //0 成功  非0 失败
         if(result==0){
           this.$router.replace({
              path: '/success',
              query:{
                id:sessionStorage.getItem('orderId')
            }
        })
          //会员
          if(sessionStorage.getItem('orderType')=='2'){
             if(this.userInfo.memberFlag==0){  //不是会员
                getOrderDesc(sessionStorage.getItem('orderId')).then(res=>{
                  let op ={
                    createTime:currentDate(),
                    expireTime:currentDateLater(),
                    memberFees: res.data.item.payAmount,
                    memberYear:1,
                    memberLevelId:4,
                    userId:res.data.item.userId,
                    nickname:res.data.item.userNickName
                   }
                   saveMember(op).then(res=>{
                      // alert('开通成功')
                         axios.all([getUserInfoById(this.userInfo.userId),getUserMemberById(this.userInfo.userId)])
                              .then(axios.spread((UserInfo,UserMember)=>{
                                  setToken(UserInfo.data)
                                  this.getUserInfo()
                                  this.reload()
                                  store.commit('GETMEMBERINFO',UserMember.data.item.data)
                              }))
                      // getUserInfoById(this.userInfo.userId).then(res=>{
                      //       setToken(res.data)
                      //       this.getUserInfo()
                      // })
                   })
                })
             }else{ //是会员
                 getUserMemberById(this.userInfo.userId).then(res=>{
                    var  memberData=res.data.item.data
                    var  expireTime = new Date(res.data.item.data.expireTime)
                    var  newExpireTime = expireTimeDateLater(expireTime)
                    memberData.expireTime =newExpireTime
                    // memberData.memberLevelId=4
                    updateMember(memberData).then(res=>{
                      // alert('续费成功')
                      // getUserInfoById(this.userInfo.userId).then(res=>{
                      //       setToken(res.data)
                      //       this.getUserInfo()
                      //       this.reload()
                      // })
                       axios.all([getUserInfoById(this.userInfo.userId),getUserMemberById(this.userInfo.userId)])
                        .then(axios.spread((UserInfo,UserMember)=>{
                            setToken(UserInfo.data)
                            this.getUserInfo()
                            store.commit('GETMEMBERINFO',UserMember.data.item.data)
                        }))
                    })
                 })
             }
          }
         }else{
           this.$router.replace({
              path: '/fail',
              query:{
                  id:sessionStorage.getItem('orderId')
              }
           })
         }
    },
    iosPayResult(result){
         this.getCartList()
         //0 成功  非0 失败
         if(result==0){
           this.$router.replace({
              path: '/success',
              query:{
                id:sessionStorage.getItem('orderId')
            }
        })
          //会员
          if(sessionStorage.getItem('orderType')=='2'){
             if(this.userInfo.memberFlag==0){  //不是会员
                getOrderDesc(sessionStorage.getItem('orderId')).then(res=>{
                  let op ={
                    createTime:currentDate(),
                    expireTime:currentDateLater(),
                    memberFees: res.data.item.payAmount,
                    memberYear:1,
                    memberLevelId:4,
                    userId:res.data.item.userId,
                    nickname:res.data.item.userNickName
                   }
                   saveMember(op).then(res=>{
                      // alert('开通成功')
                         axios.all([getUserInfoById(this.userInfo.userId),getUserMemberById(this.userInfo.userId)])
                              .then(axios.spread((UserInfo,UserMember)=>{
                                  setToken(UserInfo.data)
                                  this.getUserInfo()
                                  this.reload()
                                  store.commit('GETMEMBERINFO',UserMember.data.item.data)
                              }))
                      // getUserInfoById(this.userInfo.userId).then(res=>{
                      //       setToken(res.data)
                      //       this.getUserInfo()
                      // })
                   })
                })
             }else{ //是会员
                 getUserMemberById(this.userInfo.userId).then(res=>{
                    var  memberData=res.data.item.data
                    var  expireTime = new Date(res.data.item.data.expireTime)
                    var  newExpireTime = expireTimeDateLater(expireTime)
                    memberData.expireTime =newExpireTime
                    // memberData.memberLevelId=4
                    updateMember(memberData).then(res=>{
                      // alert('续费成功')
                       axios.all([getUserInfoById(this.userInfo.userId),getUserMemberById(this.userInfo.userId)])
                        .then(axios.spread((UserInfo,UserMember)=>{
                            setToken(UserInfo.data)
                            this.getUserInfo()
                            store.commit('GETMEMBERINFO',UserMember.data.item.data)
                        }))
                    })
                 })
             }
          }
         }else{
           this.$router.replace({
              path: '/fail',
              query:{
                  id:sessionStorage.getItem('orderId')
              }
           })
         }
    },
      reload () {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      }
 },
  mounted(){
      // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
      window.onbeforeunload = function (e) {
          var storage = window.localStorage;
          storage.clear()
      }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 14px;
  height: 100%;
}
.amap-logo {
    right: 0 !important;
    left: auto !important;
    display: none !important;
}
.amap-copyright {
    right: 70px !important;
    left: auto !important;
    opacity:0 !important;
 }
.van-overlay{
  background-color:rgba(0,0,0,.1)!important
}
/* .van-radio__icon--round 
{
  position: absolute!important;
    right: 10px!important;
}  */

</style>
