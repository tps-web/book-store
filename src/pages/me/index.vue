<template>
  <div class="me">
    <div class="top">
      <!-- <van-icon name="arrow-left" size="30" class="icon"/> -->
      <div class="user_mess">
         <van-image
           round
           width="4.5rem"
           height="4.5rem"
           src="https://img.yzcdn.cn/vant/cat.jpeg"
           class="avater"
         />
       <div class="name">陈楚生</div>
      </div>
    </div>
    <div class="user_group">
      <div class="box" v-for="(item,index) in user_group" :key="index">
           <van-image :src="item.bgImg" width="32">
             <div class="van-info">1</div>
           </van-image>
           <div class="box_name">{{item.name}}</div>
        <!-- <img :src="item.bgImg" alt="" width="48" > -->
      </div>
    </div>
    <div class="setting_group">
      <van-cell  value="我的钱包"   is-link  :icon="require('../../assets/images/qb.png')" to="/" />
      <van-cell  value="收货地址"   is-link  :icon="require('../../assets/images/shdz.png')" to="/address" />
      <van-cell  value="优惠卷"     is-link  :icon="require('../../assets/images/yhj.png')" to="/" />
      <van-cell  value="兑换中心"   is-link  :icon="require('../../assets/images/yhzx.png')" to="/" />

    </div>
  <navigate/>
  </div>
</template>

<script>
export default {
  name: 'Me',
  data () {
    return {
      user_group:[
       {
        bgImg : require('../../assets/images/qbdd.png'),
        name:'全部订单'
       },
       {
        bgImg:require('../../assets/images/dfk.png'),
        name:'代付款'
       },
        {
        bgImg:require('../../assets/images/dfh.png'),
        name:'代发货'
       },
        {
        bgImg:require('../../assets/images/dsh.png'),
        name:'待收货'
       },
        {
        bgImg:require('../../assets/images/dgh.png'),
        name:'代归还'
       },
        {
        bgImg:require('../../assets/images/djs.png'),
        name:'待结算'
       },
        {
        bgImg:require('../../assets/images/dpj.png'),
        name:'待评价'
       },
        {
        bgImg:require('../../assets/images/tk.png'),
        name:'退款'
       }
      ]
    }
  },
  components:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.me{
  position: relative;
}
.top{
  width:100%;
  height:485px;
  background-image:  url(../../assets/images/top.png);
  background-size:100%;
  border-radius: 0 0 20px 20px;
}
.icon{
  position: absolute;
  top: 20px;
  left: 20px;
}
.user_mess{
  position: absolute;
  top: 100px;
  left: 60px;
  display: flex;
}
.avater{
  border:2px solid rgba(255,255,255,1);
}
.name{
  font-size: 22px;
  margin-left: 20px;
  font-family:PingFangSC-Semibold,PingFang SC;
  color:rgba(34,34,34,1);
  height:166px;
  line-height: 166px;
}
.user_group{
  position: relative;
  top: -160px;
  width: 90%;
  margin: 0 auto;
  height: 350px;
  padding: 10px;
  background:rgba(255,255,255,1);
  box-shadow:0px -2px 8px 0px rgba(0,0,0,0.1);
  border-radius:16px;
  display:flex;
  justify-content: space-between;
  flex-wrap:wrap;
}
.box{
  font-size: 12px;
  padding: 25px 40px;
}
.box_name{
  margin-top:6px;
}
.setting_group{
  width: 90%; 
  margin: 0 auto;
  margin-top: -120px;
  padding: 16px;
  background:rgba(255,255,255,1);
  box-shadow:0px -2px 8px 0px rgba(0,0,0,0.1);
  border-radius:16px;
}
.van-icon__image {
    width: 1.5em;
    height: 1.5em;
}
.van-cell__value--alone{
  margin-left:8px;
}
</style>
