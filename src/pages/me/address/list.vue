<template>
  <div>
    <headerNav title="我的地址"/>
     <div class="box" v-for="(item,index) in list" :key="index">
     	<div class="name">
     		<span class="username">{{item.name}}</span>
     		<span class="tel">{{item.tel}}</span>
     		<span class="default" v-if="item.isDefault">默认</span>
     	</div>
     	<div class="address">
     		{{item.address}}
     	</div>
     	<div class="btn">
     		<van-button  size="small" type="default">删除</van-button>
     		<van-button  size="small" type="default">编辑</van-button>
     	</div>
     </div>
</div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      chosenAddressId: '1',
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室浙江省杭州市拱墅区莫干山路浙江省杭州市拱墅区莫干山路',
          isDefault: true,
        },
        {
          id: '2',
          name: '李四',
          tel: '1310000000',
          address: '浙江省杭州市拱墅区莫干山路 50 号',
        },
      ],
    };
  },
  methods: {
    onAdd() {
      Toast('新增地址');
      this.$router.push('/edit')
    },
    onEdit(item, index) {
      this.$router.push('/edit')
      Toast('编辑地址:' + index);
    },
    onSelect(item){
        console.log(item)
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
	width: 92%;
	margin: 16px auto;
	height: 204px; 
    font-size: 16px;
	padding: 30px 20px;
	background:rgba(255,255,255,1);
    box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);
    border-radius:8px;
    text-align: left;
    position: relative;
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
	width:80px;
	text-align: center;
	background-color: #FFCD01;
	padding: 8px;
	border-radius: 16px;
    height:20px;
    font-size:10px;
    font-weight:600;
    line-height:20px;
}
.btn{
	position: absolute;
	bottom: 10px;
	right: 20px;
}
.van-button--small{
	width: 66px;
    border-radius: 10px;
}
</style>



