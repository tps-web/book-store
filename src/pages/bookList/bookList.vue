<template>
  <div class="">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-image class="topImg" src="https://huisn-1253895285.cos.ap-guangzhou.myqcloud.com/resourcePlus/CaiZhouMianBaoZouDeNvHai/1583999065013_2.jpg" />
      <div class="descBox">
          <div class="small_box"> 
            <div class="tit">2020年度荟声评选10大精选作品</div>
            <div class="desc">
                生活中，不难发现某种情况下情商重要性大于智商，良好 的修养可以展现你整体的素养。今天为大家推荐5本大幅 提高修养和情商的5本好书。
            </div>
         </div>
      </div>
      <div class="content_box">
          <div class="store_box" v-for="(item,index) in 6" :key="index">
            <van-image class="store_boxImg" radius="4px" src="https://huisn-1253895285.cos.ap-guangzhou.myqcloud.com/resourcePlus/CaiZhouMianBaoZouDeNvHai/1583999060949_1.jpg" />
            <div class="store_box_content">
                <div class="title">驮盐的驴子</div>
                <div class="author">作者：荟声</div>
                <div class="price">
                    <span class="fh">￥</span>
                    <span class="priceNum">42.00</span>
                </div>
            </div>
            <div class="store_box_right">
              <van-image :src="require('../../assets/images/homeCart.png')" class="cart_img"/><span class="font">加入购物车</span>  
            </div>
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.topImg{
    width: 100%;
    background:rgba(0,0,0,1);
    opacity:0.85;
}
.descBox{
    position: relative;
    padding: 16px 10px;
    border-radius:8px;
    width: 86%;
    top: -50px;
    margin: 0px auto;
    background:rgba(255,255,255,1);
    z-index: 2;
    box-shadow:0px 1px 4px 0px rgba(0,0,0,0.1);
}
.small_box{
    width: 94%;
    margin:  0 auto;
}
.tit{
    text-align: left;
    font-size: 14px;
}
.desc{
    margin-top: 6px;
    font-size: 12px;
    color:rgba(153,153,153,1);
    text-align: left;
}
.content_box{
    width: 94%;
    margin: 0 auto;
    position: relative;
    top: -45px;
}
.store_box{
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 14px auto;
  box-shadow: 1px 1px 3px 1px rgba(0,0,0,0.1);
  padding: 12px 10px;
  border-radius:8px;
}
.store_boxImg{
    width: 70px;
    height: 90px;
}
.store_box_content{
    flex: 6;
    margin-left: 12px;
    text-align: left;
}
.title{
    margin-top: 5px;
}
.author{
    color: #999;
    margin: 10px 0;
}
.price{
    margin: 6px 0;
    color: #FC5650;
}
.fh{
    font-size: 12px;
}
.priceNum{
    font-size: 16px;
}
.store_box_right{
    flex: 4;
    margin: auto 0;
    color: #999;
    font-size: 10px;
}
.cart_img{
    width: 20px;
    height: 20px;
}
.font{
    position: relative;
    top: -5px;
    left: 4px;
    display: inline-block;
    height: 28px;
    line-height: 28px;
}
</style>
