<template>
  <div class="">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
     <div class="box">
          <van-image :src="require('../../assets/images/store.png')" class="box_left" />
          <div class="box_right"> 
              <div class="title">
                  获奖作品
              </div>
              <div class="desc">
                  生活中，不难发现某种情况下情商重 要性大于智商，良好的修养可以展…
              </div>
              <div class="total">共5本</div>
          </div>
     </div>

     <div class="box" @click="goUrl()">
          <van-image :src="require('../../assets/images/store.png')" class="box_left" />
          <div class="box_right"> 
              <div class="title">
                  2020届优秀作品集
              </div>
              <div class="desc">
                  精选2020年度最优秀的10部作品，希 望大家喜欢…
              </div>
              <div class="total">共10本</div>
          </div>
     </div>
     </van-pull-refresh>
  </div>
</template>

<script>

export default {
  data () {
    return {
      isLoading:false
    }
  },
  methods:{
      onRefresh(){
         setTimeout(() => {
          this.$toast('刷新成功');
           this.isLoading = false;
         }, 1000);
     },
     goUrl(){
         this.$router.push('/bookList')
     }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
  position: relative;
  width:92%;
  height: 100px;
  margin: 12px auto;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 4px 0px rgba(0,0,0,0.1);
  border-radius:8px;
  display: flex;
  padding: 6px;
}
.box_left{
    flex: 3;
}
.box_right{
    flex: 7;
    margin-left: 14px;
    text-align: left;
}
.box_right .title{
   color:rgba(34,34,34,1);
   font-size: 16px;
   font-weight:500;
   margin-top: 6px;
}
.desc{
    margin: 10px 0;
    font-size: 12px;
    color:rgba(153,153,153,1);
}
.total{
    position:absolute;
    bottom: 15px;
    font-size: 12px;
    color: #FFCD01;
    margin-top: 10px;
}
</style>
