<template>
  <div class="">
      <van-image
        width="100%"
        height="200" :src="require('../../../assets/images/zbg.png')" />
    <div class="a">
       <div class="b">
           <div class="c">
               <div class="d">
                <van-image
                   round :src="userInfo.userHead" class="header"/>
                    <div class="msg">
                        <div>{{userInfo.userNickName}}</div>
                        <div class="date">{{memberInfo.expireTime}}到期</div>
                    </div>
                    <div class="btn" @click="gourl()">
                        立即续费
                    </div>
                </div>
           </div>
       </div>
        <van-cell value="会员须知" is-link class="xuzhi" size="large" @click="goDesc('会员须知')"/>
        <van-cell value="会员权益" is-link class="quanyi" size="large" @click="goDesc('会员权益')"/>
    </div>
  </div>
</template>

<script>
import { setToken, getToken } from '@/utils/authcookie'
import { getAllDataByType,getUserMemberLevel } from "@/api";
import {mapState} from 'vuex'

export default {
  data () {
    return {
       userInfo:JSON.parse(getToken())
    }
  },
  computed:{
     ...mapState(['memberInfo'])
  },
  methods:{
    goDesc(str){
      getAllDataByType(str).then(res=>{
        this.$router.push(`/dataDesc/${res.data.rows[0].id}`)
      })
     },
      gourl(){
          this.$router.push('/vip')
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.a{
    width: 99%;
    /* height: 200px; */
    position: relative;
    top: -150px;
}
.b{
    width: 330px;
    height: 240px;
    background-image: url('../../../assets/images/zvip.png');
    background-repeat:no-repeat;
    background-attachment:fixed;
    background-size:100%;
    background-position:top left;
    margin: 0px auto;
    border-radius: 14px;
}
.c{
    margin: 0px auto;
}
.btn{
    margin-top: 15px;
    width: 80px;
    height: 25px;
    line-height: 25px;
    border: 1px solid #FFCD01;
    border-radius: 10px;
    color: #FFCD01;
    margin:  16px auto;
}
.header{
    width: 78px;
    height: 78px;
    margin-top: 30px;
    border: 1px solid rgba(255,255,255,1);
}
.msg{
    margin-top: 5px;
    font-size:20px;
    color: #fff;
    font-weight:500;
}
.date{
    margin-top: 4px;
    font-size: 12px;
}
.xuzhi{
    width: 86%;
    margin: 20px auto 0;
    border-radius: 6px;
    box-shadow: 0px 0 4px 0 rgba(0, 0, 0, 0.1);
}
.quanyi{
    width: 86%;
    margin: 0px auto;
    border-radius: 6px;
    box-shadow: 0px 0 4px 0 rgba(0, 0, 0, 0.1);
}
</style>
