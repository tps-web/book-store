<template>
  <div class="" >
    <!-- 头部 -->
  	<van-nav-bar
      title=""
      :right-text="isShowEmptyCart?(editor?'完成':'编辑'):''"
      @click-right="onClickRight" v-if="isShowEmptyCart"
    />
    <!-- 购物车为空 -->
    <div class="emptyCart" v-show="!isShowEmptyCart">
        <img src="../../assets/images/nodata.png" alt="" width="100" height="100">
        <div class="emptyText">购物车为空</div>
    </div>
    <!-- 购物车有数据 -->
      <div class="contentWrapper"
           v-show="isShowEmptyCart">
        <div class="" v-for="(item,index) in getShopCart" :key="index">
       <section>
         <div class="shopCartListCon">
            <div class="left">
                <a href="javaScript:;"
                  :checked="item.checked"
                   class="cartCheckBox"
                   @click.stop="single(item.id)"></a>
            </div>
            <div class="center" @click="godesc(item)">
                <img  :src="item.smallImage" class="goodsImg">
            </div>
            <div class="right" @click="godesc(item)">
                <div class="bookName">{{item.name}}</div>
                 <div style="display:inline-block;color:red;margin-top:8px" v-show="item.price"><span>￥</span><span class="num">{{item.price|decimals}}</span></div>
                   <div :class="[item.rebatePrice?'show_decoration':'noshow']"  v-show="item.rebatePrice">
                      <span>￥{{item.allPrice|decimals}}</span>
                   </div>
                <!-- <div class="bookPrice">
                  <div style="display:inline-block;text-decoration: line-through;margin-right:4px;font-size:14px" v-show="item.rebatePrice">
                    <span style="font-size:12px;margin-right:2px;">￥</span>{{item.allPrice}}</div>
                  <span style="font-size:12px;margin-right:0px">￥</span>{{item.price}}
                </div> -->
                <div class="rebat" v-show="item.rebatePrice">优惠了 <span style="color:red">{{item.discounts}}</span> 元</div>
            </div>
         </div>
       </section>
       </div>
      </div>
    <div class="submit-bar" v-show="isShowEmptyCart">
       <div class="checkBox" style="margin:auto 20px">
            <van-checkbox v-model="isCheckedAll"
                        checked-color='#629357'>全选</van-checkbox>
       </div>
       <div class="select">
         <span>已选: <span style="color:rgba(255,205,1,1);">{{checkedNum}}</span> 件</span>
       </div>
       <div class="submit">
         <div class="rent" @click="goRent">会员租书</div>
         <div class="bug" @click="goBug"><div style="color:red;margin-top: 8px;">
           ￥{{totalPrice}}</div>
           <div>立即购买</div>
          </div>
       </div>
    </div>
     <!-- 编辑 -->
     <div class="submit-bar" v-show="editor">
       <div class="checkBox" style="margin:auto 20px">
            <van-checkbox v-model="isCheckedAll"
                        checked-color="#629357">全选</van-checkbox>
       </div>
       <div class="submit">
         <div class="del" @click="del()">移除</div>
       </div>
    </div>
    <navigate/>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'cart',
  data () {
    return {
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
    // 2.延展出store里的shopCart的数据
    ...mapState(['shopCart', 'userInfo']),
    ...mapGetters(
      { totalPrice: 'SELECTED_GOODS_PRICE',getShopCart:'getShopCart'}
    ),
    // 3.计算shopCart的数量  这里选中的物品数量 不是根据checked 展示是否为空购物车使用 
    totalCount () {
      return Object.keys(this.getShopCart).length;
    },
    // 4.是否全部选中
    isCheckedAll: {
      get () {
        // console.log(this.totalCount)
        let tag = this.totalCount > 0;
        let shopCart = this.getShopCart;
        Object.values(shopCart).forEach(goods => {
          if (!goods.checked) {
            tag = false;
          }
        });
        return tag;
      },
      set (value) {
        // console.log(value)
        // 改变store中的值
        let isCheckedAll = !value;
        this.ALL_SELECT_GOODS({ isCheckedAll });
      }
    },
    //5 计算选择数目
    checkedNum(){
        let shopCart = this.getShopCart;
        let num=0
        Object.values(shopCart).forEach(goods=>{
          if(goods.checked){
            num++
          }
        })
        return num
    }
    
  },
  created(){
  },
  methods:{
   ...mapMutations([ 'SINGLE_SELECT_GOODS', 'ALL_SELECT_GOODS', 'DELETE_SELECT_GOODS']),
   ...mapActions(['deleteGoods']),
    godesc(item){
      // console.log(item)
      this.$router.push(`/goodsDetails/${item.id}`)
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
    //点击租书
    goRent(){
      //判断是否会员
      if(this.userInfo.memberFlag!=0){
        //不等于0 为会员
        if(this.checkedNum&&this.checkedNum<4){
             this.$toast('需要租4本起')
          }else if(!this.checkedNum){
            this.$toast('没有勾选商品')
          }else if(this.checkedNum&&this.checkedNum>8){
            this.$toast('租借不能超过8本')
          }else{
            this.$router.push('/rentOrder')
          }
      }else{
        // 非会员
        this.$toast('只对会员开放')
      }
     
    },
    //点击购买按钮
     goBug(){
      if(this.checkedNum){
        //  this.$toast('买书')
         this.$router.push('/order')
      }else{
         this.$toast('没有勾选')
      }
    },
    //单个选中
    single(goodsId){
      this.SINGLE_SELECT_GOODS({goodsId})
    },
    //删除
    del(){
       if(this.checkedNum){
         this.$dialog.alert({
         message: "是否确定删除？", //改变弹出框的内容
         showCancelButton: true //展示取水按钮
        })
        .then(() => { //点击确认按钮后的调用
          //  console.log("点击了确认按钮噢")
            this.deleteGoods()
        })
        .catch(() => { //点击取消按钮后的调用
            console.log("点击了取消按钮")
        })
        //  this.$toast('删除')
        //  console.log(this.checkedNum)
        // this.DELETE_SELECT_GOODS() 
      }else{
         this.$toast('没有勾选')
      }
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
  margin: 120px auto;
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
   margin: 14px auto 0;
   padding: 6px;
   box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);
   border-radius:8px;
}
.shopCartListCon{
  display:flex;
  justify-content: flex-start;
  height: 86px;
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
  width: 86px;
  height: 86px;
  display:-webkit-flex;
  display:flex;
  -webkit-flex-flow : column nowrap;
  flex-flow : column nowrap;
}
/* .center img{
  border-radius: 4px;
} */
.goodsImg{
  border-radius: 4px;
  width: 70px;
  margin-left : auto;
  margin-right : auto;
  margin: auto;
}
.right{
  flex: 6;
  text-align: left;
  font-weight:500;
  margin-left: 8px;
  padding-top: 4px;
  color:rgba(34,34,34,1);
  position: relative;
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
  height: 55px;
  position: fixed;
  background:rgba(255,255,255,1);
  box-shadow:0px -2px 8px 0px rgba(0,0,0,0.1);
  bottom: 49PX;
  right: 0;
  display: flex;
}
.checkbox{
  display:inline-block;
  height: 55px;
  width: 100%;
}
.van-checkbox__icon{
 font-size: 18px;
}
.select{
   margin: auto 10px;
}
.submit{
  display: flex;
  position: absolute;
  right:0;
  height:100%;
}
.rent{
  padding: 0 16px;
  background:rgba(34,34,34,1);
  color: #ff1;
  line-height: 55px;
}
.bug{
  padding: 0 16px;
  background:rgba(255,205,1,1);
  color: #000;
}
.del{
  line-height: 55px;
  width: 100px;
  padding: 0 16px;
  color: #fff;
  font-weight:500;
  background:rgba(252,86,80,1);
}
.rebat{
  position: absolute;
  bottom: 4px;
  font-size: 12px;
}
.show_decoration{
  color: #ccc;
  font-size: 10px!important;
  display:inline-block;
  text-decoration:line-through;
  margin-left: 4px;
}
.noshow{
  font-size: 14px;
}
</style>
