<template>
  <div class="">
    <!-- 头部 -->
  	<van-nav-bar
      title="购物车"
      :right-text="editor?'完成':'编辑'"
      @click-right="onClickRight"
    />
    <!-- 购物车为空 -->
    <div class="emptyCart" v-show="!isShowEmptyCart">
        <img src="../../assets/images/nodata.png" alt="" width="100" height="100">
        <div class="emptyText"> 购物车为空</div>
    </div>
    <!-- 购物车有数据 -->
      <div class="contentWrapper"
           v-show="isShowEmptyCart">
        <div class="" v-for="(item,index) in 6" :key="index">
       <section>
         <div class="shopCartListCon">
            <div class="left">
                <a href="javaScript:;"
                  :checked="isTrue"
                   class="cartCheckBox"
                   @click.stop="single()"></a>
            </div>
            <div class="center">
                <img  src="https://huisn-1253895285.cos.ap-guangzhou.myqcloud.com/resourcePlus/HongWuXie/1590377209024_1.jpg" width="90" height="90">
            </div>
            <div class="right">
                <div class="bookName">红舞鞋</div>
                <div class="bookPrice"><span style="font-size:12px;margin-right:2px">￥</span>42</div>
            </div>
         </div>
       </section>
       </div>
      </div>
    <div class="submit-bar" v-show="isShowEmptyCart">
       <div class="checkBox">
            <van-checkbox v-model="isCheckedAll"
                        checked-color='#45c763'>全选</van-checkbox>
       </div>
       <div class="select">
         <span>已选: <span style="color:rgba(255,205,1,1);">1</span> 件</span>
       </div>
       <div class="submit">
         <div class="rent">会员租书</div>
         <div class="bug" @click="goBug">立即购买</div>
       </div>
    </div>
     <!-- 编辑 -->
     <div class="submit-bar" v-show="editor">
       <div class="checkBox">
            <van-checkbox v-model="isCheckedAllEditor"
                        checked-color='#45c763'>全选</van-checkbox>
       </div>
       <div class="submit">
         <div class="del">移除</div>
       </div>
    </div>
    <navigate/>
  </div>
</template>

<script>

export default {
  name: 'cart',
  data () {
    return {
      totalCount:1,
      isTrue:false,
      isCheckedAll:false,
      editor:false,
      isCheckedAllEditor:false
    }
  },
  computed:{
    // 1.是否显示空购物车样式
    isShowEmptyCart () {
      let isshow = false;
      if (this.totalCount > 0) {
        isshow = true;
      }
      return isshow;
    },
  },
  methods:{
    onClickLeft(){
     history.back();
    },
    //编辑
    onClickRight(){
      if(!this.editor){
        //  console.log("编辑")
         this.editor=true
      }else{
        // console.log("完成")
         this.editor=false
      }
    },
    onSubmit(){
      console.log("提交")
    },
    single(){
      this.isTrue=!this.isTrue
    },
    goBug(){
      this.$router.push('/order')
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped >
.van-nav-bar{
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.emptyCart{
  margin: 40px auto;
}
.emptyText{
  color: #999;
}
.contentWrapper{
  margin-top: 55px;
  margin-bottom: 120px;
}
section {
   width: 92%;
   margin: 10px auto 0;
   padding: 6px;
   box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);
   border-radius:8px;
}
.shopCartListCon{
  display:flex;
  justify-content: flex-start;
  height: 90px;
  padding: 5px 0;
}
.left{
  flex: 1;
  display: flex;
}
.left a{
   display: inline-block;
   margin: auto 10px;
}
.cartCheckBox{
    background: url("../../assets/images/shop-icon.png") no-repeat;
    background-size: 60px 110px;
    width: 24px;
    height: 24px;
}
.cartCheckBox[checked] {
     background-position: -30px 0;
}
.center{
  flex: 3;
  width: 100px;
  height: 100px;
}
.center img{
  border-radius: 4px;
}
.right{
  flex: 6;
  text-align: left;
  font-weight:500;
  margin-left: 8px;
  padding-top: 4px;
  color:rgba(34,34,34,1);
}
.bookName{
  font-size: 16px;
}
.bookPrice{
  font-size: 16px;
  color:rgba(252,86,80,1);
  margin-top: 5px;
}
.submit-bar{
  width: 100%;
  height: 50px;
  position: fixed;
  background:rgba(255,255,255,1);
  box-shadow:0px -2px 8px 0px rgba(0,0,0,0.1);
  bottom: 50px;
  right: 0;
  display: flex;
}
.checkbox{
  display:inline-block;
}
.van-checkbox{
  margin: 15px 6px 0px 20px;
}
.select{
  margin: 16px 6px 0px 10px;
}
.submit{
  display: flex;
  position: absolute;
  right:0;
  height:100%;
  line-height: 50px;
}
.rent{
  padding: 0 16px;
  background:rgba(34,34,34,1);
  color: #ff1;
}
.bug{
   padding: 0 16px;
  background:rgba(255,205,1,1);
  color: #000;
}
.del{
  width: 100px;
  padding: 0 16px;
  color: #fff;
  font-weight:500;
  background:rgba(252,86,80,1);
}
</style>
