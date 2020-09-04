<template>
  <div>
     <div class="contentWrapper">
        <div class="" v-for="(item,index) in bugRentBookList" :key="index">
       <section>
         <div class="shopCartListCon" >
            <div class="left">
                <a href="javaScript:;"
                   :checked="item.checked"
                   class="cartCheckBox"
                   @click.stop="single(item,index)"></a>
            </div>
            <div class="center" @click="godesc(item)" >
                <img  :src="item.bookPic" class="goodsImg">
            </div>
            <div class="right" >
                <div class="bookName">{{item.bookName}}</div>
                <div class="bookPrice">￥{{item.bookPrice|decimals}}</div>
            </div>
         </div>
       </section>
       </div>
      </div>
      <div class="bugBtn">
          <div class="checkBox"> 
                <van-checkbox v-model="isCheckedAll" style="height:50px;line-height:50px"
                   checked-color='#629357'>全选</van-checkbox>
          </div>
          <div class="selectNum">
                已选<span style="color:rgb(255, 205, 1)">{{checkedNum}}</span>本
          </div>
           <div @click="goBug" class="gobug">
                <span v-show="rentTotal!=0" style="color:red;font-size:14px">￥{{rentTotal}}</span>
                <span>买断</span>  
            </div> 
      </div>
  </div>
</template>

<script>
var that
import {getOrderDesc,updateOrder,getBookDesc} from '@/api'
import {bugFormatGoods} from '@/utils'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
        getShopCart:'',
        newList:[]
    }
  },
  computed:{
      ...mapGetters(
      { bugRentBookList: 'bugRentBookList',rentTotal:'RENT_BOOK_TOTAL'}
    ),
       // 3.计算shopCart的数量  这里选中的物品数量 不是根据checked 展示是否为空购物车使用 
    totalCount () {
      return this.bugRentBookList.length;
    },
    isCheckedAll: {
      get () {
        let tag = this.totalCount > 0;
        let shopCart = this.bugRentBookList;
        if(shopCart.length){
            shopCart.forEach(goods => {
            if (!goods.checked) {
                tag = false;
            }
          });
        }
        return tag;
      },
      set (value) {
        // 改变store中的值
        let isCheckedAll = !value;
        this.ALL_SELECT_RENT({ isCheckedAll });
      }
    },
        //5 计算选择数目
    checkedNum(){
        let getShopCart = this.bugRentBookList;
        if(getShopCart.length>0){
            let num=0
            Object.values(getShopCart).forEach(goods=>{
            if(goods.checked){
                num++
            }
            })
           return num
        }
    },
  },
  created(){
    that=this
    getOrderDesc( this.$route.params.id ).then(res=>{
           this.$store.commit('BUGRENTBOOKLIST',bugFormatGoods(res.data.item.list))
        })
      // getOrderDesc( this.$route.params.id ).then(res=>{
      //   var arr=res.data.item.list
      //   let op={curPage :1,isHotSearch :0,pageRows :1 }
      //   arr.forEach(ele=>{
      //       op.id=ele.bookId
      //      getBookDesc(op).then(res=>{
      //          this.newList.push(res.data.book) 
      //      })
      //   })
      // })
  },
  methods:{
      ...mapMutations(['ALL_SELECT_RENT']),
    single(item,index){
        this.$store.commit('SELETE_GOODS_RENT',index)
    },
    godesc(item){
       this.$router.push(`/goodsDetails/${item.bookId}`)
    },
    goBug(){
        if(this.checkedNum==0){
            that.$toast('请选择买断商品')
        }else{
            this.$router.push(`/bugRentOrder/${this.$route.params.id}`)
        }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contentWrapper{
    margin-bottom: 66px;
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
.bugBtn{
  position: fixed;
  bottom: 0;
  height: 55px;
  font-size: 16px;
  line-height: 55px;
  width: 100%;
  background:#fff;
  display: flex;
  justify-self: start;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
}
.checkBox{
  display:inline-block;
  height: 55px;
  line-height: 55px;
  position: relative;
  left: 30px;
}
.payNum{
    color: red;
}
.selectNum{
    height: 55px;
    padding: 0 5px;
    line-height: 55px;
    position: relative;
    left: 60px;
}
.gobug{
  width: 35%;
  height: 55px;
  position:absolute;
  right: 0px;
  padding: 0 6px;
  background: rgba(255,205,1,1);
  color: #000;
}

</style>
