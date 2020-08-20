<template>
  <div class="">
     <!-- <headerNav title="会员中心"/> -->
     <div class="top">
       <van-image
        width="100%"
        height="200" :src="require('../../../assets/images/bg.png')" />
     </div>
     <div class="box">
      <van-image
        :src="require('../../../assets/images/vipImg.png')" class="vipImg"/>
       <van-grid :column-num="4" :border="false">
         <van-grid-item  >
           <div class="yuan">
             <span class="font">正</span>
           </div>
           <div style="margin-top:6px;font-size:12px">正片保证</div>
         </van-grid-item>
          <van-grid-item  >
           <div class="yuan">
             <span class="font">往</span>
           </div>
           <div style="margin-top:6px;font-size:12px">往返包邮</div>
         </van-grid-item>
          <van-grid-item  >
           <div class="yuan">
             <span class="font">百</span>
           </div>
           <div style="margin-top:6px;font-size:12px">百万绘本</div>
         </van-grid-item>
          <van-grid-item  >
           <div class="yuan">
             <span class="font">正</span>
           </div>
           <div style="margin-top:6px;font-size:12px">正片保证</div>
         </van-grid-item>
        </van-grid>
     </div>
     <div class="vipBug">
        <van-cell title="荟声VIP年卡"   :value="'￥'+payPerice" title-style="text-align: left" value-class="textClass" />
        <van-cell title="会员卡有效期"  :value="yearNum+'个月'" title-style="text-align: left" size="large"  />
         <!-- <van-popup v-model="showExpress"  position="bottom" >  @click="showExpress=true"
          <van-picker   
            title="选择开通月数"
            show-toolbar
            :default-index="0"
            :columns="columns"
            value-key = "expressName"
            @confirm="Confirm"
            @cancel="onCancel"
        />
        </van-popup> -->
     </div>

     <van-cell value="会员须知" is-link class="xuzhi" size="large" @click="goDesc('会员须知')"/>
     <van-cell value="会员权益" is-link class="quanyi" size="large" @click="goDesc('会员权益')"/>

     <div class="btn" @click="goPay">{{memberInfo?'立即续费':'立即开通'}}</div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {getNowFormatDate} from '@/utils'
import { getAllDataByType } from "@/api";
export default {
  data () {
    return {
      yearNum:12,
      showExpress:false,
      columns:[12,24,36,48],
      payPerice:365,
      memberLevelId:4
    }
  },
   computed:{
     ...mapState(['userInfo','memberInfo'])
  },
  methods:{
    goDesc(str){
      getAllDataByType(str).then(res=>{
        this.$router.push(`/dataDesc/${res.data.rows[0].id}`)
      })
    },
    Confirm(value, index){
      this.payPerice=365
      this.yearNum=value
      this.showExpress=false
      this.payPerice= this.payPerice*(value/12)
    },
    onCancel(){
      this.showExpress=false
    },
    goPay(){
       let op={
       id:this.userInfo.userId,
       nickname:this.userInfo.userNickName,
       memberFees:this.payPerice,
       memberLevelId:this.memberLevelId,
       memberYear:(this.yearNum/12),
       createTime: getNowFormatDate(new Date())
       }
      console.log(op)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
  position: relative;
  width: 88%;
  margin: 10px auto;
  margin-top: -70px;
  background: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
}
.vipImg{
  width: 88px;
  height: 88px;
  position:absolute;
  top: -50px;
  left: -35px;
  z-index: 1;
}
.yuan{
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #000;
}
.font{
  font-size: 16px;
  color: #FFCD00;
  height: 44px;
  line-height: 44px;
}
.vipBug{
  width: 88%;
  margin: 20px auto;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
}
.textClass{
  color: red;
}
.xuzhi{
  width: 88%;
  margin: 20px auto 0;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
}
.quanyi{
  width: 88%;
  margin: 0px auto;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
}
.btn{
  width: 100%;
  height: 45px;
  line-height: 45px;
  position:absolute;
  bottom: 0;
  background:rgba(255,205,1,1);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
}
</style>
