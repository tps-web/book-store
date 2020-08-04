<template>
  <div >
    <!-- 搜索 -->
     <Search/>
     <div class="content">
     <div class="listWrapper">
    <!-- 左边 -->
     <div class="leftWrapper" ref="leftWrapper">
        <ul class="wrapper">
          <li class="categoryItem"
              v-for="(cate, index) in categoriesData"
              :class="{ selected: currentIndex === index }"
              @click="clickLeftLi(cate,index)"
              :key="cate.id"
              ref="menuList">
            <span class="textWrapper">{{ cate.name }}</span>
          </li>
        </ul>
      </div>
      <!-- 右边 -->
      <div class="rightWrapper">
        <ContentView   :list="currentIndex" :data="data" />
      </div>
    </div>
    </div>
    <!-- 底部导航 -->
   <navigate/>
  </div>
</template>

<script>
import Search from './components/search.vue'
import ContentView from './components/contentView.vue'
import {getCategory} from '@/api'
// 2. 引入滚动组件
import BScroll from 'better-scroll'
export default { 
   components:{
     Search,
     ContentView
   },
  data () {
    return {
      categoriesData:[],
      // 左边item选中与否
      currentIndex: 0,
      cateLeft:'',
      data:[]
    }
  },
  created(){
   
  },
  mounted(){
     getCategory().then(res=>{
      this.cateLeft=res.data.items
      this.data = this.cateLeft[0].storyCategoryTypeList
      this._initData()
    })
  },
  methods: {
    _initData(){
     this.categoriesData= this.cateLeft
      // 1.4.初始化滚动视图
       if (!this.leftScroll) {
      this.$nextTick(() => {
          this.leftScroll = new BScroll('.leftWrapper', {
            probeType: 3,
            click: true,
            scrollY: true,
            tap: true,
            mouseWheel: true
          })
      })
      } else {
          this.leftScroll.refresh()
      }
   },
   clickLeftLi(cate,index){
      this.data=cate.storyCategoryTypeList
      this.currentIndex = index
      // this.currentIndex = cate.storyCategoryTypeList
      setTimeout(() => {
        let menuLists = this.$refs.menuList
        let el = menuLists[index]
        // 2.3 滚动到对应元素上
        this.leftScroll.scrollToElement(el, 300)
      }, 900)
   }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  overflow: hidden;
}
.listWrapper {
  width: 100%;
  display: flex;
  position: absolute;
  top: 50px;
  bottom: 50px;
  overflow: hidden;
}
.leftWrapper {
  background-color: #f4f4f4;
  width: 18%;
  flex: 0 0 95px;
  height: 100%;
}

.categoryItem {
  padding: 8px 0;
  border-bottom: solid 1px #e8e9e8;
  position: relative;
}

.categoryItem .textWrapper {
  line-height: 30px;
  border-left: solid 2px transparent;
  padding:5px 12px;
  font-size: 14px;
  color: #666666;
}

.categoryItem.selected {
  border-left:2px solid #3cb963;
  background: #fff;
}

.categoryItem.selected .textWrapper {
  /* border-left-color: #3cb963; */
  font-weight: bold;
  font-size: 15px;
  color: #333333;
}
.rightWrapper{
  width: 82%;
}
.box{
  width: 33%;
}
@media (min-width: 960px) {
  .wrapper {
    border-right: 1px solid #e8e9e8;
  }

  .wrapper .categoryItem {
    background: #fff;
  }
}
</style>
