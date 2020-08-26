<template>
  <div class="">
      <div class="top">
          <div class="ImgBg">
              <img src="http://49.234.126.156:9588/s1112624.jpg" alt="" class="topImg"> 
              <div class="topImg1"></div>
          </div>
      </div>
      <audio src="http://49.234.126.156:9588/1.mp3"   ref="audio" 
      @timeupdate="updataTime" 
      @canplay="getDuration" 
      @pause="onPause"
      @play="onPlay"
      @loadedmetadata="onLoadedmetadata"
      autoplay ></audio>
     <!-- 滑动块 -->
      <!-- <van-slider v-model="sliderTime" @change="changeCurrentTime"  class="slider"/> -->
      <van-slider v-model="sliderTime" active-color="#ee0a24"  @change="changeCurrentTime">
            <div slot="button" class="custom-button">
            </div>
       </van-slider>
          <div class="time1">{{ audio.currentTime|realFormatSecond }}</div> 
          <div class="time2">{{ audio.maxTime|realFormatSecond}}</div>
  </div> 
</template>

<script> 
export default {
  
  data () {
    return {
       sliderTime:0,
       audio:{
         // 该字段是1音频是否处于播放状态的属性
            playing: true,
            // 音频当前播放时长
            currentTime: 0,
            // 音频最大播放时长
            maxTime: 0,
       }
    }
  },
  created(){
  },
  mounted(){
     
  },
 methods:{
    changeCurrentTime(index){
     this.$refs.audio.currentTime = parseInt(
        (index / 100) * this.audio.maxTime
      );
    },
    onPause(){},
    onPlay(){},
  //当
  getDuration(){
      console.log(this.$refs.audio.duration)
  },
  onLoadedmetadata(e){
     this.audio.maxTime = parseInt(e.target.duration);
  },
  //每秒更新
  updataTime(res){
      this.audio.currentTime = res.target.currentTime;
      this.sliderTime = parseInt(
        (this.audio.currentTime / this.audio.maxTime) * 100
      );
    }
 },
 filters:{
     realFormatSecond(second) {
        var secondType = typeof second;
        if (secondType === "number" || secondType === "string") {
            second = parseInt(second);
            var hours = Math.floor(second / 3600);
            second = second - hours * 3600;
            var mimute = Math.floor(second / 60);
            second = second - mimute * 60;
            return (
                ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2)
            );
        } else {
            return "00:00";
        }
    }
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.custom-button {
  width: 26px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  background-color: #ee0a24;
  border-radius: 100px;
}
.top{
  width: 96%;
  margin: 6px auto;
  display: flex;
  border:1px solid #ccc;
}
.ImgBg{
    position: relative;
}
.topImg{
    width: 88px;
    opacity: 0.5;
}
.topImg1{
    position:absolute;
    top: 0;
    left: 0;
    width: 88px;
    height:100%;
    border: 1px solid red;
    background:#000;
    opacity: 0.3;
}
</style>
