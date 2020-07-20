<template>
  <div class="">
    <div class="logistics"></div>
    <div class="box">
        <div class="top">
          <div class="company">发货物流公司：顺丰快递</div>
          <div class="orderId">发货物流单号：2020095432239</div>
          <div class="estimatedDate">预计送达：7月8日09:00-15:00</div>
        </div>
         <div class="content">
        <van-steps direction="vertical" :active="0" style="width:86%;margin:0 auto; text-align: left;" >
            <van-step>
                 <div>您的订单已到达了广东中山【中山分拣中心】送往【中山石岐营业部】</div>
                 <div>2016-07-13 12:40</div>
            </van-step>
            <van-step>
                 <div>送往【中山分拣中心】</div>
                 <div>2016-07-11 12:40</div>
            </van-step>
             <van-step>
                 <div>送往【中山】</div>
                 <div>2016-07-11 12:40</div>
            </van-step>
             <van-step>
                 <div>送往【广州分拣中心】</div>
                 <div>2016-07-11 12:40</div>
            </van-step>
            <van-step>
                <div>快件已发货</div>
                 <div>2016-07-11 15:30</div>
            </van-step>
            <van-step>
                 <div>仓库处理中</div>
                 <div>2016-07-11 12:40</div>
            </van-step>
           
        </van-steps>
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
.logistics{
    /* width: 100%; */
    height: 240px;
    border:1px solid rebeccapurple;
}
.box{
    position: relative;
    border: 1px solid rgba(0,0,0,0.1);
    box-shadow:0px 0px 4px 0px rgba(0,0,0,0.1);
    border-radius: 8px 8px 0 0;
    margin-top: -10px;
    background: #fff;
}
.top{
    width: 86%;
    padding: 8px 14px ;
    margin: 16px auto;
    text-align: left;
    box-shadow:0px 0px 4px 0px rgba(0,0,0,0.1);
    border-radius:4px;
}
.top div{
    margin: 14px 6px 12px;
    font-size: 12px;
}
.top div:first-child{
    margin-top: 10px ;
}

</style>
