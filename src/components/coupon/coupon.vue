<template>
  <div class="contentBox">
     <!-- <headerNav title="优惠券"/> -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
       <div class="noData" v-show="usableArr.length==0&&disabledArr.length==0">
        <van-image width="120"  :src="require('../../assets/images/noCart.png')" />
        <div style="margin-left: 10px;color:#999">暂无优惠券~</div>
       </div>
      <div>
        <!-- 有优惠券 -->
      <div class="box" v-for="(item,index) in usableArr" :key="index" @click="selectItem(item)">
        <van-image  :src="require('../../assets/images/bg-use.png')" />
        <div class="pos">
        <div class="content">
        	<div class="num" v-show="item.type=='0'">
               ￥<span class="useNum">{{item.price}}</span>
        	</div>
        	<div class="num" v-show="item.type=='1'">
               <span class="useNum">{{item.discount}}</span>折
        	</div>
        	<div class="boxNum">
        	 <div class="canNum">
               <div class="bg_fill">满{{item.useNum}}元使用</div>
               <div>{{item.desc}}</div>
        	 </div>
        	</div>
        	<div class="useBtn">
        		<div class="btn_content"><span class="use_font">立即<br/>使用</span></div>
        	</div>
        </div>
        <div class="date">
          <span  class="xian" style="background-image: linear-gradient(to right, #fff,red );"></span>
           有效期：{{item.useDay}}
          <span  class="xian" style="background-image: linear-gradient(to right, red, #fff);"></span>
        </div>
        </div>
      </div>
      <!-- 不可用 -->
      <div class="box"  v-for="ele in disabledArr" :key="ele.id">
        <van-image  :src="require('../../assets/images/bg-used.png')" />
        <div class="pos">
          <div class="invalid_content">
        	<div class="invalid_num" v-show="ele.type==0">
               ￥<span class="useNum">{{ele.price}}</span>
        	</div>
          <div class="invalid_num" v-show="ele.type==1">
               <span class="useNum">{{ele.discount}}</span>折
        	</div>
          <div class="invalid_num" v-show="ele.type==2">
               <div v-if="ele.discount!=0"><span class="useNum" >{{ele.discount}}</span>折</div>
               <div v-else>￥<span class="useNum" >{{ele.price}}</span></div>     
        	</div>
        	<div class="boxNum">
        	 <div class="canNum">
               <div class="invalid_bg_fill">满{{ele.useNum}}元使用</div>
               <div>{{ele.desc}}</div>
        	 </div>
            </div>
        	<div class="useBtn">
        		<div class="invalid_btn_content"><span class="used_font">{{ele.descTest}}</span></div>
        	</div>
        </div>
    </div>
   </div>
  </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {compareDate,formatCoupon} from '@/utils'
export default { 
   props:{
        coupon:{
            type:Array
        }
   },
  data () {
    return {
    	isLoading:false,
        usableArr:[],
        disabledArr:[]
    }
  },
  computed:{
    // ...mapState(['coupon'])
  },
  created(){
    //  console.log(this.coupon)
      var couponList=formatCoupon(this.coupon)
       this.disabledArr=couponList.disabledArr
       this.usableArr=couponList.usableArr
  },
  methods:{
    onRefresh(){
      setTimeout(() => {
       this.$toast('刷新成功')
        this.isLoading = false;
      }, 1000);
    },
    selectItem(item){
        this.$emit('selectCoupon',item)
   }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.noData{
  margin-top: 10%;
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
.xian{
  display:inline-block;
  margin:0 2px;
  width:26px;
  height:1px;
  position: relative;
  top:-3px
}
</style>
