<template>
  <div>
     <!-- <Skeleton v-show="isShowLoading" /> -->
    <div class="content">
      <div class="popcontent" v-show="isPop">
            <div class="popBox">
                <van-image :src="require('../../assets/images/pop.png')" class="popImg" @click="goVip" />
                <van-icon name="close" size="36"  @click="closeBtn" class="closeBtn"/>
            </div>
      </div>
     <!-- 搜索 -->
     <Search/>
      <!-- 刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 轮播图 -->
      <Banner :bannerItem="bannerItem" v-if="bannerItem"/>
      <!-- nav -->
      <Nav :navItem="navItem" v-if="navItem"/>
      <!-- 本周新书 -->
      <WeekBook :weekItem="weekItem" v-if="weekItem"/>
      <!-- 推荐音频 -->
      <!-- <bannervoice/> -->
       <!-- 新书上架 -->
      <!-- <New-Book/> -->
      <!-- 书单 -->
      <BookList :bookItem="bookItem" v-if="bookItem"/>
      <!-- 猜你喜欢 -->
       <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
       >
       <Related :listItem="listItem" v-if="listItem" class="related"/>
       </van-list>
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
import bannervoice from './components/bannervoice.vue'


var that
import {getBookList,index} from '@/api'
import {mapState, mapGetters} from 'vuex'
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
     WeekBook,
     bannervoice,
  },
  data () {
    return {
      isPop:true,
      isShowLoading:true,
      isLoading:false,
      bookList:[],
      bannerItem:"",
      navItem:"",
      weekItem:"",
      bookItem:"",
      listItem:[],
       finished:false, //是否加载完
       loading:false,  //下拉
       curPage:1, //当前页面
       pageRows:6, //请求一页有多少数据
       list:[],  
       total:'',
       listData:'',
      //  maxPages:''
    }
  },
  created(){
    if(this.userInfo.memberFlag!=0){
      // 是会员 不显示pop
      this.isPop=false
    }else if(this.isPopPass){
      //显示过了
      this.isPop=false
    }
    that=this
    this._initData()
    that.getItem()
  },
  mounted(){
  },
   computed:{
    ...mapState(['userInfo']),
    ...mapGetters(['isPopPass'])
   },
   methods: {
     goVip(){
       this.$router.push(`/vip`)
       this.$store.commit('ISPOPPASS',true)
     },
     closeBtn(){
       this.isPop=false
       this.$store.commit('ISPOPPASS',true)
     },
     _initData(){
        let op={curPage:1,pageRows:6}
        index(op).then(res=>{
          // console.log(res.data.items[4].data)
          this.bannerItem=res.data.items[0]
          this.navItem=res.data.items[1]
          this.weekItem=res.data.items[2]
          this.bookItem=res.data.items[3]
          // this.listItem=res.data.items[4]
        })
     },
     getItem(){
       let op={curPage:that.curPage,pageRows:that.pageRows}
        index(op).then(res=>{
            that.listData=res.data.items[4].data.records
            this.total=res.data.items[4].data.total
            if(this.curPage==1){
               this.listItem=res.data.items[4].data.records
            }else{ 
                this.listItem = this.listItem.concat(res.data.items[4].data.records)
            }
        })
    },
    onRefresh() {
      setTimeout(()=>{
          that.curPage=1
          that._initData()
          this.isLoading=false
          // this.$toast('刷新成功')
      },500)
    },
    onLoad(){
         setTimeout(() => {
            if (this.isLoading) {
                 this.isLoading = false;
            }
            this.curPage++
            this.getItem()
            this.loading = false;
            if(that.total)
            if (that.listData.length==0) {
               this.finished = true;
            }
        }, 300);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
  background-color: #fff;
  margin-bottom: 40px;
}
.popcontent{
  position: fixed;
  left: 0;
  top:0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 11;
}
.popBox{
  width: 80%;
  position: relative;
  top: 50%; 
  transform: translateY(-50%);
  margin: 0 auto;
}
.closeBtn{
  display: inline-block;
}

</style>
