<template>
  <div class="">
     <headerNav title="我的钱包"/>
     <div class="box">
        <div class="myWallet">
            <span>我的钱包</span>
            <span>我的押金<van-icon name="arrow" /></span>
        </div>
        <div class="walletNum">
            ￥ <span class="num"> 1000.00</span>
        </div>
        <div class="btn">
            <van-button round size="large" type="default">提现</van-button>
            <van-button round size="large" type="default">充值</van-button>
        </div>
     </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
    width:90%;
    /*height: 404px;*/
    height: 180px;
    margin: 0px auto;
    background:rgba(255,205,1,1);
    border-radius:8px; 
    font-size: 14px;
    font-weight:600;
    padding: 10px;
}
.myWallet{
    display: flex;
    justify-content: space-between;
    height: 30px;
    line-height: 30px
}
.van-icon{
   top: 2px;
}
.walletNum{
    text-align: left;
    margin-top: 20px;
    font-size: 16px;
}
.num{
    font-size: 40px;
    font-weight:400;
    color:rgba(34,34,34,1);
}
.btn{
    margin-top: 30px;
    display:flex;
    justify-content:space-around;
}
.van-button--large{
  /*  width: 120px;
    height:40px;*/
    width: 30%;
    color:rgba(255,205,1,1);

}
</style>
