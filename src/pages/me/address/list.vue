<template>
  <div class="contention">
    <!-- <headerNav title="我的地址"/> -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="noData" v-if="!shippingAddress.length">
        <van-image width="120"  :src="require('../../../assets/images/noCart.png')" />
        <div style="margin-left: 10px">暂无我的地址~</div>
      </div>
    <div class="bigBox" v-else>
     <div class="box" v-for="(item,index) in shippingAddress" :key="index">
     	<div class="name">
     		<span class="username">{{item.name}}</span>
     		<span class="tel">{{item.tel}}</span>
     		<span class="default" v-if="item.isDefault">默认</span>
     	</div>
     	<div class="address">
     		{{item.address}}
     	</div>
     	<div class="btn">
     		<van-button  size="small" type="default" @click="onDelete(item)">删除</van-button>
     		<van-button  size="small" type="default" @click="onEdit(item,index)">编辑</van-button>
     	</div>
     </div>
    </div>
    </van-pull-refresh>
     <div class="add" @click="onAdd">新增地址</div>
</div>
</template>

<script>
import { Toast } from 'vant';
import {mapState,mapActions} from 'vuex'
import {removeAddress} from '@/api'
export default {
  data() {
    return {
      isLoading:false,
      chosenAddressId: '1',
    };
  },
  computed:{
     ...mapState(['shippingAddress']),      
  },
  methods: {
    ...mapActions(['getALLAddressList']),
    onAdd() {
      // Toast('新增地址');
      this.$router.push('/edit')
    },
    onEdit(item, index) {
      this.$router.push(`/edit/${item.id}`)
      // Toast('编辑地址:' + item.id);
    },
    onDelete(item){
      // Toast('删除地址:' + item.id);
         this.$dialog.alert({
                    message: "是否确定删除？", //改变弹出框的内容
                    showCancelButton: true //展示取水按钮
                })
                .then(() => { //点击确认按钮后的调用
               removeAddress(item.id).then(res=>{
                this.$toast('删除成功')
                this.getALLAddressList()
                })
                })
                .catch(() => { //点击取消按钮后的调用
                    // console.log("点击了取消按钮")
                })
   
    },
    onRefresh(){
       setTimeout(() => {
         this.getALLAddressList()
        Toast('刷新成功');
        this.isLoading = false;
      }, 800);
    }
  },
};  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.noData{
  margin:35% auto;
  color: rgba(153,153,153,1);
}
.bigBox{
  width: 100%;
  /*height:1334px;*/
  overflow: auto;
}
.box{
	width: 90%;
	margin: 10px auto;
	height: 104px; 
  font-size: 16px;
	padding:  10px;
	background:rgba(255,255,255,1);
  box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);
  border-radius:8px;
  text-align: left;
  position: relative;
}
.box:last-child{
  margin-bottom: 50px;
}
.tel{
  font-size: 14px;
  color: #999;
}
.address{
	  margin-top: 20px;
    font-size: 12px;
}
.default{
	display: inline-block;
	margin-left: 10px;
	width:30px;
	text-align: center;
	background-color: #FFCD01;
	padding: 4px;
	border-radius: 16px;
  height:10px;
  font-size:10px;
  font-weight:600;
  line-height:10px;
}
.btn{
	position: absolute;
	bottom: 10px;
	right: 10px;
}
.van-button--small{
	width: 66px;
    border-radius: 10px;
}
.add{
	width:96%;
	position: fixed;
	bottom: 2px;
  margin: 0 8px;
	border-radius: 50px;
	height:44px;
	line-height: 44px;
	background:rgba(255,205,1,1);
	font-weight:500;
  color:rgba(34,34,34,1);
  font-size: 16px;
}
</style>



