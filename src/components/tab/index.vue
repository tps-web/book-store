
<template>
  <div class="">
   <van-tabs v-model="activeName" swipeable sticky @change="onChange">
    <van-tab v-for="(item,index) in tabNameList" :title="item.name" :key="index" :name="item.id">
    	<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <van-image :src="require('../../assets/images/nodata.png')" radius="6px" v-if="finished&&total===0" class="nodata"/>
			  <van-list
				v-model="loading"
				:finished="finished"
				finished-text="没有更多了"
				@load="onLoad"
      		  >
				<goods :listItem="list"/>
      	   <!-- <van-grid :column-num="2" :border="false">
      	   	 <van-grid-item v-for="(item,index1) in list" :key="index1" @click="goDetails(index1)">
              <van-image :src="item.verticalImage" radius="6px" class="goodsImg"/>
                <div class="storeName">{{item.title}}</div>
                   <div class="category" >
                      <div v-for="(item,index2) in 2" :key="index2" :style="{background:color[index2].bg}" class="one">
         	              <span style="color:#000; opacity: 1">0-3岁</span>
                      </div>
                  </div>
              </van-grid-item>
      	     </van-grid> -->
			</van-list>
      	  </van-pull-refresh>
    </van-tab>
  </van-tabs>

  </div>
</template>

<script>
import {getChildCategoryBookList} from '@/api'
import goods from '@/components/goodsItem/item'

var that
export default {
  props:['tabNameList'],
  components:{
	  goods
  },
  data () {
    return {
    	activeName:'',
		color:[{bg:'rgba(0,114,255,1)'},{bg:'rgba(255,205,1,1)'}],
		isLoading:false, //上拉
		finished:false, //是否加载完
		loading:false,  //下拉
		curPage:0, //当前页面
		pageRows:6, //请求一页有多少数据
		list:[],  
		total:0,
		itemId:''
    }
  },
  watch:{
	  tabNameList(newVal,oldVal){
		 if(newVal){
			that.activeName=newVal[0].id
			// this.getItem()
		 }
	  },
  },
  methods:{
	onChange(active){
		// console.log(active)
		this.curPage=0
	    this.onLoad();
	},
	getItem(){
		// console.log(that.activeName)
       let op={curPage:that.curPage,pageRows:that.pageRows,categoryId:that.activeName}
        getChildCategoryBookList(op).then(res=>{
			// console.log(res.data)
            that.total=res.data.total
            that.loading = false;
            that.isLoading = false;  
            that.dataList=res.data
            if(that.dataList.rows.length>0){
               that.finished = false;
                that.list=that.list.concat(res.data.rows)
            }else{
               that.finished = true;
            }
        })
	},
	 onRefresh(){
         that.list = [];
         that.curPage = 1;
		setTimeout(() => {
			that.getItem();
		},500)
     },
    // //下拉刷新
     onLoad(){
          setTimeout(() => {
             that.curPage++;
             that.getItem();
        }, 500);
     },
  	// goDetails(id){
  	// 	this.$router.push('/goodsDetails')
  	// },
  },
  created(){
	  that=this
  },
  mounted(){
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.storeName{
	width: 96%;
	font-family:PingFangSC-Regular,PingFang SC;
    text-align: left;
	padding: 6px 8px;
}
.category{
	width: 100%; 
	font-size: 10px;
	display: flex;
}
.one{
	opacity:0.7;
	padding:3px;
	border-radius: 4px;
	margin:0 4px;
}
.nodata{
	margin-top:60px;
	width: 108px;
}
.goodsImg{
	width: 160px;
	height: 200px;
}
</style>
