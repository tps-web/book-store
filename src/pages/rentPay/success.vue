<template>
  <div class="">
    <div class="bg">
        <div class="success_img">
            <van-image :src="require('../../assets/images/success.png')"  class="succ_img"/>
          <div class="text">
            <div class="success_text">提交成功！</div>
            <div>感谢您的支持</div>
          </div>
        </div>
    </div>
      <div class="btn">
              <van-button type="default" @click="goOrder">查看订单</van-button>
              <van-button type="default" style="margin-left:30px" @click="goHome">返回首页</van-button>
      </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  methods:{
    goHome(){
      this.$router.push(`/`)
    },
    goOrder(){
      console.log('查看订单')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg{
    width: 100%;
    height: 240px;
    background:rgba(4,198,123,1);
}
.success_img{   
    position: absolute;
    top: 84px;
    left: 84px;
    display:flex;
}
.succ_img{
    width: 64px;
    height: 64px;
}
.text{
    color: #fff;
    text-align: left;
    margin-left: 12px;
    margin-top: 8px;
}
.success_text{
    font-size: 20px;
    margin-bottom: 2px;
}
.btn{
  margin: 40px auto;
}
</style>
