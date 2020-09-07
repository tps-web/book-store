<template>
  <div class="" >
    <!-- <Map v-if="lnglat.length>=2" :lnglat="lnglat"  :sent='sent' :receiver='receiver' /> -->
    <div class="box">
        <div class="top">
          <div class="company">发货物流公司：{{deliveryCompany}}</div>
          <div class="orderId">发货物流单号：{{deliverySn}}</div>
          <!-- <div class="estimatedDate">预计送达：{{logisticsData.EstimatedDeliveryTime}}</div> -->
        </div>
         <div class="content">
         <van-steps direction="vertical" :active="0" style="width:86%;margin:0 auto; text-align: left;" >
            <van-step v-for="(item,index) in logisticsData" :key="index">
                 <div class="address">{{item.context}}</div>
                 <div class="date">{{item.ftime}}</div>
            </van-step>
        </van-steps>
    </div>
    </div> 
  </div>
</template>
<script>
import Map from '@/components/map/map.vue'
import {getLogistics} from '@/api'
import axios from 'axios'
export default {
  components:{
    Map
  },
  data () {
    return {
      sent:'',
      receiver:'',
      // lnglat:[["113.434576","23.208843"],["116.287149","39.858427"]],
      lnglat:[],
      logisticsData:'',
      deliverySn:"", //订单编号
      deliveryCompany:'', //快递名
      nu:''
    }
  },
  created(){
    getLogistics(this.$route.params.id).then(res=>{
      // this.getLogisticsSent(res.data.sent.address,res.data.receiver.address)
      // this.getLogisticsReceiver(res.data.receiver.Address)
      this.deliveryCompany=res.data.order.deliveryCompany
      this.deliverySn=res.data.order.deliverySn
      if(res.data.result){
         this.logisticsData=res.data.result
        //   this.logisticsData= JSON.parse(res.data.result).Data[0]
        //   this.logisticsData.Traces.sort(function(a, b) {
        //   return b.AcceptTime < a.AcceptTime ? -1 : 1
        // })
      }
    })
  },
  mounted(){
  if (window.history && window.history.pushState) {
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', this.goBack, false);
  }
},
destroyed(){
  window.removeEventListener('popstate', this.goBack, false);
},
methods:{
   getLogisticsSent(data,data1){
     axios
     .get(`https://restapi.amap.com/v3/geocode/geo?address=${data}&output=JSON&key=df1133f2ead971ccb7d7524865904909`)
     .then(res=>{
      //  console.log(res.data.geocodes[0].location)
       this.sent=res.data.geocodes[0].location.split(',')
        this.lnglat.push(this.sent)
        this.getLogisticsReceiver(data1)
        // this.lnglat[0]=this.sent
        // console.log(this.lnglat)
     })
   },
   getLogisticsReceiver(data){
     axios
     .get(`https://restapi.amap.com/v3/geocode/geo?address=${data}&output=JSON&key=df1133f2ead971ccb7d7524865904909`)
     .then(res=>{
      //  console.log(res.data.geocodes[0].location)
       this.receiver=res.data.geocodes[0].location.split(',')
       this.lnglat.push(this.receiver)
      //  this.lnglat[1]=this.receiver
     })
   },
   goBack(){
    var path=sessionStorage.getItem('path')
    var pathChildren= sessionStorage.getItem('pathChildren')
    this.$router.replace({path: `/bugAndRent/${path}/${pathChildren}`});
    //replace替换原路由，作用是避免回退死循环
  }
},
filters:{
  formatTime(time){
    var num = time.lastIndexOf(':')
    return time.slice(0,num+3)
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
    /* border: 1px solid rgba(0,0,0,0.1); */
    /* box-shadow:0px 0px 4px 0px rgba(0,0,0,0.1); */
    border-radius: 8px 8px 0 0;
    /* margin-top: -10px; */
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
.address{
  font-size: 12px;
}
.date{
  font-size: 12px;
}
</style>
