<template>
 <div>
   <div class="map" id="i-map" ref="map"></div>
   <!-- {{lnglat}} -->
  </div>
</template>

<script>

export default {
    // props:{
    //     lnglat:Array
    // },
    props:['lnglat','sent','receiver',],
    name: 'HelloWorld',
    data () {
      return {
      
      }
    },
   created(){
    //  console.log( this.sent)
    //  console.log( this.receiver)
  },
   methods: {
      getAddressKeyword() {
          //通过getLocation();方法获取位置信息值
          this.map.getLocation(); //调用自带的接口
        },
    },
    mounted() {
     this.map = new AMap.Map('i-map',{
        zoom: 12,
          });//加载地图
         console.log(this.lnglat)
      //  let mainPointArr = item.routes;//关键点的数组，其中包括起点和终点，也有可能包含途径点。
      //  let mainPointArr=[["113.392782","22.517645"],["116.287149","39.858427"]]
      let mainPointArr=this.lnglat
      let that = this;
      let waysLngLatObj = [];
      this.map.plugin('AMap.Driving', function () {
        var driving = new AMap.Driving({
          map: that.map,
          policy: AMap.DrivingPolicy.LEAST_TIME,//这是规划策略，类似导航的时间最短、距离最短、不走高速等，具体看官网
          showTraffic: false,
          polyOptions: {strokeColor: "#00AA00"}
        });
        for(var i=1; i<mainPointArr.length - 1; i++) {//找到关键点
          waysLngLatObj.push([mainPointArr[i][0], mainPointArr[i][1]]);
        }
          driving.search(mainPointArr[0], mainPointArr[mainPointArr.length - 1], {waypoints: waysLngLatObj})
      });
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map{
  width:100%;
  height: 220px;
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
</style>
