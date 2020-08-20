<template>
  <div>
  <audio src="http://m10.music.126.net/20200820130709/e4ef37dd7e6829ae6b4ca7f437614a29/ymusic/5353/0f0f/0358/d99739615f8e5153d77042092f07fd77.mp3"
   type="audio/mp3" ref="audio">
  </audio>
    <div class="margin-top:200px" @click="play">播放</div>
    <div class="top">
        <van-image radius="6px" class="voiceImg" src="http://huisnbook-1253895285.cos.ap-guangzhou.myqcloud.com/storyBook/1597895580910_s1112624.jpg"/>
        <div class="desc">
           <div class="tit">爱心树</div>
           <div class="">一部感恩教育的经典作品为何备受争议？</div>
           <div class="playNum">播放量100</div>
        </div>
    </div>
    <div class="contron">
       <div class="time">{{audio.currentTime}} / {{audio.maxTime}}</div> 
        <div style="width:80%">
           <van-progress
            pivot-text=""
            color="#1989FA"
            :percentage="25"
            /> 
        </div>
    </div>
    <div class="goods">
        <van-image radius="6px" class="voiceImg" src="http://huisnbook-1253895285.cos.ap-guangzhou.myqcloud.com/storyBook/1597895580910_s1112624.jpg"/>
        <div class="goodsDesc">
           <div class="goodTit">爱心树</div>
        </div>
    </div>
  </div>
</template>

<script>
var that
export default {
  data () {
    return {
     audio: {
        // 该字段是1音频是否处于播放状态的属性
        playing: false,
        // 音频当前播放时长
        currentTime: 0,
        // 音频最大播放时长
        maxTime: 0,
        musicid:'' //save
      },
    }
  },
  created(){
 
  },
  mounted(){
    if(this.$refs.audio.duration ){
       console.log(this.$refs.audio.duration)
    }
  },
  methods:{  
     play(){
       this.$refs.audio.play()
     }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top{
  width: 96%;
  margin: 8px auto;
  display: flex;
  position: relative;
}
.voiceImg{
   width: 88px;
}
.desc{
  text-align: left;
  margin-left: 10px;
}
.tit{
   margin-bottom: 8px;
}
.playNum{
 position: absolute;
 bottom: 10px;
}
.contron{
  width: 90%;
  margin: auto 0;
  display: flex;
  margin: 20px auto;
}
.time{
  position: relative;
  top: -6px;
  margin-right: 4px;
  background:#4B4A48;
  padding: 1px 6px;
  color: #fff;
  text-align: center;
  border-radius: 6px
}
.goods{
  width: 90%;
  border-radius: 6px;
  margin: 0 auto;
  border: 1px solid red;
  display: flex;
  padding: 6px;
}
.goodsDesc{
  margin-left: 10px;
  margin-top: 4px;
}
</style>
