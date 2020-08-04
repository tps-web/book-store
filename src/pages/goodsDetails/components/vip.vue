<template>
  <div class="vip">
      <div class="content">
        <div class="join">加入会员</div>
        <span class="enjoy">往返免运费 免租金 免押金</span>
        <img src="../../../assets/images/VIP.png" alt="" class="icon_vip">
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
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vip{
 width: 96%;
 margin: 20px auto;
 height: 80px ;
 background:linear-gradient(90deg,rgba(255,188,1,1) 0%,rgba(255,205,1,1) 100%);
 box-shadow:0px 0px 4px 0px rgba(0,0,0,0.1);
 border-radius:8px;
}
.content{
    text-align: left;
    color: black;
    padding-left: 25px;
    position: relative;
    top: 0;
    left: 0;
}
.join{
    font-size: 17px;
    font-weight:700;
    color:rgba(34,34,34,1);
}
.enjoy{
    position: relative;
    top: -4px;
    font-size: 14px;
    display: inline-block;
    color:rgba(34,34,34,1);
}
.icon_vip{
    width: 102px;
    position:absolute;
    bottom: 0px;
    right: 10px;
}
</style>
