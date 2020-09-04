<template>
  <div>
    <!-- <van-tree-select
      class="box"
      :items="items"
      :main-active-index="mainActiveIndex"
      :active-id="activeId"
      @navclick="onNavClick"
      @itemclick="onItemClick"
    /> -->
    <van-tree-select
  class="box"
  :items="items"
  :main-active-index.sync="active"
>
  <template slot="content" >
    <div class="bigBox" v-for="(item,index) in items" :key="index" v-show="active === index">
       <div class="smallBox" v-for="(ele,index1) in item.children" :key="index1" @click="gourl(ele)">
           <div class="name">{{ele.name}}</div>
       </div>
    </div>
  </template>
</van-tree-select>
  </div>
</template>

<script>
import {listAll,allSeriesStory} from '@/api'

export default {
  data() {
    return {
      active: 0,
      items: [{ text: '分组 1' }, { text: '分组 2' }]
      // items:[],
      // // 左侧高亮元素的index
      // mainActiveIndex: 0,
      // // 被选中元素的id
      // activeId: 1
    };
  },
  created(){
    let op={ userId:169}
    allSeriesStory().then(res=>{
      console.log(res.data)
    })
    listAll().then(res=>{
      // console.log(res.data.items)
      var resList =this.formatItems(res.data.items)
      // console.log(resList)
      this.items=resList
    })
    var arr=[]
    for(var i =0;i<=20;i++){
      var obj={text:'城市'+i,children:[{text:'县'+i,id:i}]}
      arr.push(obj)
    }
    //  this.items=arr
  },
  methods: {
    gourl(item){
      console.log(item)
    },
    // 过滤
    formatItems(data){
      var newList =[]
       data.map(ele=>{
         var obj={
           text:ele.name,
           children:ele.storyCategoryTypes
         }
         newList.push(obj)
       })
       return newList
    },
    onNavClick(index) {
      this.mainActiveIndex = index;
    },
    onItemClick(data) {
      this.activeId = data.id;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
  /* height: 667px!important; */
  height: 100%!important;
}
.bigBox{
  width: 96%;
  margin:  0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.smallBox{
  width: 40%;
  margin: 10px 0;
  padding: 6px 4px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
  border-radius: 6px;
}
.name{
  display: inline-block;
}
</style>
