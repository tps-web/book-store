<template>
  <div>
    <div class="tit">编辑推荐</div>
    <div class="box" @click="goVoice">
        <van-image  class="voiceImg" src="http://huisnbook-1253895285.cos.ap-guangzhou.myqcloud.com/storyBook/1597895580910_s1112624.jpg"/>
      <div class="desc">
        <div class="title">爱心树</div>
        <div class="voiceDesc">一部感恩教育的经典作品为何备受争议？</div>
      </div>
    </div>  
</div>
 
</template>

<script>

export default {
   props:{
    bannerItem:{
       type:Object
    }
  },
  data () {
    return {
     
    }
  },
  created(){
    
  },
  methods:{
   goVoice(){
     this.$router.push('/voice')
   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
  width: 90%;
  margin: 10px auto;
  display: flex;
  padding: 6px 4px; 
  border-radius: 6px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
}
.tit{
  width: 94%;
  margin: 10px auto 0;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
}
.voiceImg{
  width: 88px;
}
.desc{
  margin: 6px 0 0 8px;
  text-align: left;
  font-size: 12px;
}
.title{
  font-size: 14px;
}
.voiceDesc{
  margin-top: 8px;
}
</style>
