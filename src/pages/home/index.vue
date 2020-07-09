<template>
  <div>
     <Skeleton v-show="isShowLoading" />
    <div class="content" v-if="!isShowLoading">
     <!-- 搜索 -->
     <Search/>
      <!-- 刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 轮播图 -->
      <Banner/>
      <!-- nav -->
      <Nav/>
       <!-- 新书上架 -->
      <New-Book/>
      <!-- 书单 -->
      <BookList/>
      <!-- 猜你喜欢 -->
      <Related/>
     </van-pull-refresh>
   </div>
    <!-- 底部导航     -->
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


export default {
  name: 'home',
  components:{
     Banner,
     Nav,
     NewBook,
     Search,
     BookList,
     Related,
     Skeleton
  },
  data () {
    return {
      isShowLoading:true,
      isLoading:false,
    }
  },
  created(){
    setTimeout(()=>{
       this.isShowLoading=false
    },800)
  },
   methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
      }, 1000);
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
