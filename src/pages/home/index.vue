<template>
  <div>
     <!-- <Skeleton v-show="isShowLoading" /> -->
    <div class="content" v-if="!isShowLoading">
     <!-- 搜索 -->
     <Search/>
      <!-- 刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 轮播图 -->
      <Banner :bannerItem="bannerItem"/>
      <!-- nav -->
      <Nav :navItem="navItem"/>
      <!-- 本周新书 -->
      <WeekBook :weekItem="weekItem"/>
       <!-- 新书上架 -->
      <!-- <New-Book/> -->
      <!-- 书单 -->
      <BookList :bookItem="bookItem"/>
      <!-- 猜你喜欢 -->
      <Related :listItem="listItem"/>
     </van-pull-refresh>
   </div>
    <!-- 底部导航 -->
     <navigate/>
  </div>
</template>

<script>
import Banner from './components/banner.vue'
import Nav from './components/nav.vue'
import NewBook from './components/newbook.vue'
import Search from './components/search.vue'
import BookList from './components/booklist.vue'
import Related from './components/related.vue'
import Skeleton from './components/skeleton.vue'
import WeekBook from './components/weekBook.vue'

import {getBookList,index} from '@/api'
export default {
  name: 'home',
  components:{
     Banner,
     Nav,
     NewBook,
     Search,
     BookList,
     Related,
     Skeleton,
     WeekBook
  },
  data () {
    return {
      isShowLoading:true,
      isLoading:false,
      bookList:[],
      bannerItem:"",
      navItem:"",
      weekItem:"",
      bookItem:"",
    }
  },
  created(){
    this._initData()
    // window.androidCallJs = this.androidCallJs; 
  },
  mounted(){
    // window.androidCallJs = this.androidCallJs; 
  },
   methods: {
     _initData(){
        index().then(res=>{
          // console.log(res.data.items)
          this.bannerItem=res.data.items[0]
          this.navItem=res.data.items[1]
          this.weekItem=res.data.items[2]
          this.bookItem=res.data.items[3]
          this.listItem=res.data.items[4]
          this.isShowLoading=false
          // console.log(res)
        })
     },
    onRefresh() {
      setTimeout(() => {
        this._initData()
        this.$toast('刷新成功');
        this.isLoading = false;
      }, 800);
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
  background-color: #fff;
}

</style>
