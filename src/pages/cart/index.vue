<template>
  <div class="" >
    <!-- 头部 -->
  	<van-nav-bar
      title="购物车"
      :right-text="isShowEmptyCart?(editor?'完成':'编辑'):''"
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
        <div class="" v-for="(item,index) in shopCart" :key="index">
       <section>
         <div class="shopCartListCon">
            <div class="left">
                <a href="javaScript:;"
                  :checked="item.checked"
                   class="cartCheckBox"
                   @click.stop="single(item.id)"></a>
            </div>
            <div class="center">
                <img  :src="item.smallImage" width="90" height="90">
            </div>
            <div class="right">
                <div class="bookName">{{item.name}}</div>
                <div class="bookPrice"><span style="font-size:12px;margin-right:2px">￥</span>{{item.price}}</div>
            </div>
         </div>
       </section>
       </div>
      </div>
    <div class="submit-bar" v-show="isShowEmptyCart">
       <div class="checkBox" style="margin:auto 20px">
            <van-checkbox v-model="isCheckedAll"
                        checked-color='#45c763'>全选</van-checkbox>
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
                        checked-color='#45c763'>全选</van-checkbox>
       </div>
       <div class="submit">
         <div class="del" @click="del()">移除</div>
       </div>
    </div>
    <navigate/>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'

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
      { totalPrice: 'SELECTED_GOODS_PRICE'}
    ),
    // 3.计算shopCart的数量  这里选中的物品数量 不是根据checked 展示是否为空购物车使用 
    totalCount () {
      return Object.keys(this.shopCart).length;
    },
    // 4.是否全部选中
    isCheckedAll: {
      get () {
        // console.log(this.totalCount)
        let tag = this.totalCount > 0;
        let shopCart = this.shopCart;
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
        let shopCart = this.shopCart;
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
    console.log(this.totalPrice)
  },
  methods:{
   ...mapMutations([ 'SINGLE_SELECT_GOODS', 'ALL_SELECT_GOODS', 'DELETE_SELECT_GOODS']),
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
      if(this.checkedNum){
         this.$toast('租书')
      }else{
         this.$toast('没有勾选')
      }
    },
    //点击购买按钮
     goBug(){
      if(this.checkedNum){
         this.$toast('买书')
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
         this.$toast('删除')
        this.DELETE_SELECT_GOODS()
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
  width: 100px;
  padding: 0 16px;
  color: #fff;
  font-weight:500;
  background:rgba(252,86,80,1);
}
</style>
