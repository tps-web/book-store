<template>
  <div class="">
      <div class="top">
          <van-image :src="require('../../assets/images/top.png')" class="top_img"/>
           <div class="top_tit">已发货</div>
      </div>
      <!-- 运输 -->
       <div class="expess">
          <van-image :src="require('../../assets/images/goods.png')" class="expess_img"/>
          <div class="content">
              <div class="content_top">运输中</div>
              <div class="content_botton">快件由【广东中山运转中心】发往【广东中转...</div>
          </div>
          <van-icon name="arrow" class="expess_right" size="20" />
       </div>
       <!-- 联系人 -->
       <div class="expess">
          <van-image :src="require('../../assets/images/posi.png')" class="expess_img"/>
          <div class="content">
              <div class="content_top">
                  <span>黄先生</span>
                  <span class="tel">18812345678</span>
              </div>
              <div class="content_botton">广东省中山市盛景尚峰2012</div>
          </div>
       </div>
     <selectGoods/>
     <van-cell title="商品金额" value="￥36.6" size="large" title-style="text-align: left;font-size: 14px;" />
      <van-cell title="优惠券" value="￥9.9" size="large" title-style="text-align: left;font-size: 14px;"/>
      <div class="total">支付金额：<span style="color:red">￥213.20</span></div>
      <!-- 订单号信息 -->
      <div class="orderBox">
          <div class="left">
            <div class="orderId">订单编号:202007083451452</div>
            <div class="orderDate">订单创建时间：2020年07月05日 16:31:21</div>
          </div>
          <div class="right">
              <van-button plain type="info" round size="small" class="copeBtn" @click="cope(202007083451452)">复制</van-button>
          </div>
      </div>
      <!-- 物流信息 -->
      <div class="expressBox">
            <div class="expessName">发货物流公司：顺丰快递</div>
            <div class="expessNum">发货物流单号：2020095432239487</div>
      </div>
      <div class="bottom">
            <van-button plain type="default" round size="small" class="btn" @click="goExpress" >查看物流</van-button>
            <van-button plain type="danger" round size="small" class="btn">删除订单</van-button>
      </div>
  </div>
</template>

<script>
import selectGoods from '@/components/selectGoods/selectGoods'
export default {
  components:{
      selectGoods
  },
  data () {
    return {
    }
  },
  methods:{
      cope(num){
          console.log(num)
          const input = document.createElement('input')
          document.body.appendChild(input)
          input.setAttribute('value', num)
          input.select()
           if (document.execCommand('copy')) {
                document.execCommand('copy')
                this.open2()
            }
            document.body.removeChild(input)
      },
      open2() {
          this.$toast('复制成功')
      },
      goExpress(){
         this.$router.push('/logistics')
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top{
  position: relative;
  top: 0;
  left: 0;
}
.top_img{
    width: 100%;
    height: 70px;
}
.top_tit{
    position:absolute;
    bottom: 25px;
    left: 20px;
    font-size: 20px;
    font-weight: 500;
    color:rgba(34,34,34,1);
}
.expess{
    width: 90%;
    height: 50px;
    overflow: hidden;
    margin: 16px auto;
    padding: 12px;
    display:flex;
    box-shadow:0px 0px 4px 0px rgba(0,0,0,0.1);
    border-radius:4px;
    /* justify-content: space-between; */
}
.expess_img{
    width: 26px;
    height: 26px;
    margin: auto 0;
}
.content{
    flex: 8;
    text-align: left;
    margin: auto 10px;
}
.content_top{
    font-weight:700;
    color:rgba(34,34,34,1);
}
.content_botton{
    margin-top: 6px;
    font-size: 12px;
    height: 20;
}
.expess_right{
    margin: auto 0;
}
.tel{
    color: #999;
    margin-left: 2px;
}
.total{
    width: 90%;
    margin: 0 auto;
    padding: 16px 6px;
    text-align: right;
    border-bottom: 1px solid #ebedf0;
}

.orderBox{
    width: 92%;
    padding: 10px 8px;
    box-shadow:0px 0px 4px 0px rgba(0,0,0,0.1);
    border-radius:4px;
    margin: 16px auto;
    text-align: left;
    display: flex;
    justify-content: space-between;
}
.left{
    width: 82%;
    color: #999;
    font-size: 12px;
    margin: 6px 4px; 
}
.left .orderDate{
    margin-top: 8px;
}
.right{
    width: 18%;
    margin-top: 8px;
}
.copeBtn{
    height: 20px;
    padding: 8px 12px;
}

.expressBox{
    width: 92%;
    padding: 10px 8px;
    box-shadow:0px 0px 4px 0px rgba(0,0,0,0.1);
    border-radius:4px;
    margin: 16px auto;
    text-align: left;
    color: #999;
    font-size: 12px;
}
.expessNum{
    margin-top: 8px;
}
.bottom{
    float: right;
    margin-right: 10px;
    margin-bottom: 10px;
}
.btn{
    height: 30px;
    margin: 4px;
}
</style>
