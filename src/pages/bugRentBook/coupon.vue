<template>
  <div class="">
    <div class="closeBox">
          <span v-show="total" style="color:#ccc">点击关闭不使用优惠券</span>
         <van-icon name="close" size="24" class="close" @click="closeBtn"/>
    </div>
     <!-- <headerNav title="优惠券"/> -->
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <van-list  
        v-model="isLoading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
       >
       <div class="noData" v-show="finished&&total==0">
        <van-image width="120"  :src="require('../../assets/images/nodata.png')" />
        <!-- <div style="margin-left: 10px;color:#999">暂无优惠券~</div> -->
       </div>
      <div>
      <div class="box" v-for="(item,index) in formatCoupon" :key="index" @click="selectItem(item)">
        <van-image  :src="require('../../assets/images/bg-use.png')" class="bg" v-if="item.useStatus==0"/>
         <van-image  :src="require('../../assets/images/bg-used.png')" class="bg" v-else/>
        <div class="pos"> 
        <div :class="[item.useStatus==0 ? 'content':'invalid_content']">
        	<div class="num" >
               ￥<span class="useNum">{{item.amount}}</span>
        	</div>
        	<!-- <div class="num" v-show="item.type=='1'">
               <span class="useNum">{{item.discount}}</span>折
        	</div> -->
        	<div class="boxNum">
        	 <div class="canNum">
               <div :class="[item.useStatus==0 ?'bg_fill':'invalid_bg_fill']">满{{item.minPoint}}元使用</div>
               <div>{{item.name}}</div>
        	 </div>
        	</div>
        	<div class="useBtn" >
        		<div :class="[item.useStatus==0 ?'btn_content':'invalid_btn_content']"><span class="use_font" v-html="$options.filters.format(item.useStatus)"></span></div>
        	</div>
        </div>
        <div :class="item.useStatus==0?'date':'invalid_date'">
          <span  :class="item.useStatus==0?'xian':'invalid_xian'" ></span>
           有效期：{{item.endTime}}
          <span  :class="item.useStatus==0?'xian_right':'invalid_xian_right'" ></span>
        </div>
        </div>
      </div>
  </div>
    </van-list>
    </van-pull-refresh> 
   </div>
</template>

<script>
import {mapState,mapActions, mapGetters} from 'vuex'
// import {compareDate,formatCoupon} from '@/utils'
import {getCouponHistory } from '@/api'
var that
export default { 
  props:['goodsTotal'],
  data () {
    return {
       isLoading:false, //上拉
       finished:false, //是否加载完
       loading:false,  //下拉
       curPage:1, //当前页面
       pageRows:6, //请求一页有多少数据
       list:[],  
       total:0,
       rows:[],
       getCouponList:[]
    }
  },
  computed:{
    ...mapGetters(['SELECTED_GOODS_PRICE']),
    formatCoupon(){
       var newData = []
      this.getCouponList.map(function(ele,index,array){
            if(ele.minPoint<=that.goodsTotal){
               newData.push(ele)
            }else{
               ele.useStatus=3
               newData.push(ele)
            }
      })
      return newData
    },
//    formatGoods(list) {
//     var newData = []
//     list.map((ele) => {
//         newData.push({
//             bookId: ele.id,
//             cartItemId: ele.cartId,
//             bookIsbn: ele.bookIsbn,
//             bookName: ele.name,
//             bookPic: ele.smallImage,
//             bookPrice: ele.price,
//             bookQuantity: ele.bookQuantity
//         })
//     })
//     return newData
// }
  },
  created(){
      console.log(this.goodsTotal)
     that=this
      // this.couponList=formatCoupon(this.coupon)
      this.getFollowPage()
  },
  mounted(){
  },
  methods:{
    closeBtn(){
       this.$emit('selectCoupon','')
    },
    selectItem(item){
      if(item.useStatus==0){
        //  console.log('选中优惠券')
        this.$emit('selectCoupon',item)
      }
    },
    getFollowPage(){
        let op={curPage:that.curPage,pageRows:that.pageRows}
        getCouponHistory(op).then(res=>{
            this.total=res.data.total
            this.rows=res.data.rows
            if(that.curPage==1){
                this.getCouponList=res.data.rows
            }else{ 
                that.getCouponList = this.getCouponList.concat(res.data.rows)
            }
        })
     },
    onLoad() {
         setTimeout(() => {
            if (this.isLoading) {
                 this.isLoading = false;
            }
            this.curPage++
            this.getFollowPage()
            this.loading = false;
             if (this.rows.length===0) {
               this.finished = true;
            }
            // if (this.list.length >= this.total) {
            //    this.finished = true;
            // }
        }, 500);
       },
       //刷新
     onRefresh() {
            this.curPage=0
            // 清空列表数据
            this.finished = false;
            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true;
            this.onLoad();
     },
  },
  filters:{
    format(data){
      switch (data) {
        case 0:
          return `立即<br/>使用`
          break;
       case 1:
          return `已<br/>使用`
         break;
       case 2:
          return `已<br/>过期`
         break;
       case 3:
          return `不<br/>可用`
        break;
        default:
          return ``
          break;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.noData{
  margin-top: 70px;
}
.box{
	position: relative;
}
.pos{
	width: 90%;
  position: absolute;
	top: 30px;
	left: 26px;
}
.content{
	display: flex;
  color: rgba(255,0,85,1);
}
.num{
  /* flex:1; */
	width: 30%;
  height: 77px;
  line-height: 77px;
	font-size: 12px;
}
.useNum{
   font-size: 40px;
}
.boxNum{
	width: 45%;
  margin-left: 6px;
}
.canNum{
	width: 78%;
	margin-top: 26px;
	margin-left: 10px;
  font-size: 10px;
  text-align: center;
}
.bg_fill{
	width: 80%;
	color:#fff;
	padding: 2px;
	background-color:  rgba(255,0,85,1);
	box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);
  border-radius:20px;
  margin-bottom: 4px;
  margin-left: 10px;
  font-weight:500;
}
.useBtn{
	  width:70px;
    height:70px;
    background:rgba(245,245,245,1);
    border-radius: 50%;
    box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);
}
.btn_content{
	width: 60px;
	height: 60px;
	margin: 3px auto;
	border-radius: 50%;
	font-size: 16px;
	border: 2px solid  rgba(255,0,85,1);
	text-align: center;
}
.use_font{
  font-weight:600;
  position: relative;
  top: 10px;
}
.invalid_content{
	display: flex;
  	color: rgba(221,221,221,1);
}
.invalid_num{
	width: 30%;
	font-size: 12px;
  height: 77px;
  line-height: 77px;
}
.invalid_bg_fill{
  	width: 80%;
    color:#fff;
	padding: 2px;
	background-color:  rgba(221,221,221,1);
	box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);
    border-radius:20px;
    margin-bottom: 4px;
    font-weight:500;
}
.invalid_btn_content{
	width: 60px;
	height:60px;
	margin: 3px auto;
	border-radius: 50%;
	border: 2px solid  rgba(221,221,221,1);
	text-align: center;
}
.used_font{
  font-weight:600;
  position: relative;
  top: 20px;
}
.date{
  color: rgba(255,0,85,1);
  text-align: left;
}
.invalid_date{
  color:  rgba(221,221,221,1);
  text-align: left;
}
.xian{
  display:inline-block;
  margin:0 2px;
  width:26px;
  height:1px;
  position: relative;
  top:-3px;
  background-image: linear-gradient(to right, #fff,red )
}
.invalid_xian{
  display:inline-block;
  margin:0 2px;
  width:26px;
  height:1px;
  position: relative;
  top:-3px;
  background-image: linear-gradient(to right, #fff, rgba(221,221,221,1) )
}
.xian_right{
  display:inline-block;
  margin:0 2px;
  width:26px;
  height:1px;
  position: relative;
  top:-3px;
  background-image: linear-gradient(to right, red, #fff)
}
.invalid_xian_right{
  display:inline-block;
  margin:0 2px;
  width:26px;
  height:1px;
  position: relative;
  top:-3px;
  background-image: linear-gradient(to right, rgba(221,221,221,1), #fff)
}
.bg{
  width: 100%;
  height: 166px;
}
.closeBox{
  position: relative;
  width: 100%;
  /* height: 30px; */
}
.close{
  position:fixed;
  right: 16px;
  z-index: 10;
  margin-top: 6px;
}
</style>
