<template>
  <div>
    <div class="nodata">
      <Nodata v-show="false"/>
    </div>
   <div class="bugAll" v-for="(item,index) in 10" :key="index">
    <div class="title">
        <div class="left">购书订单</div>
        <div class="right">待发货</div>
    </div>
    <div class="content">
        <div class="box">
          <van-image width="64" height="64" radius="4" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <van-image width="64" height="64" radius="4" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <van-image width="64" height="64" radius="4" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </div>
        <div class="total">
            共4件商品
            <span class="icon"><van-icon name="arrow" /></span>
        </div>
    </div>
    <div class="btn">
       <van-button color="#FC5650" size="small" plain round>提醒发货</van-button>
       <van-button color="#FC5650" size="small" plain round>取消订单</van-button>
    </div>
  </div>
  </div>
</template>

<script>
import Nodata from './nodata'
export default {
  components:{
   Nodata
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bugAll{
    position: relative;
    width: 90%;
    margin: 16px  auto;
    padding: 10px;
    box-shadow:0px 0px 4px 0px rgba(0,0,0,0.1);
    border-radius:4px;
}
.title{
    display: flex;
    justify-content: space-between;
}
.title .right{
    color: #FC5650;
}
.content{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
}
.total{
    margin: auto 0;
}
.icon{
    position: relative;
    top:2px;
}
.btn{
 margin-top: 12px;
 display: flex;
 justify-content: flex-end;
}
.btn button{
    margin-left:8px;
}
</style>
