<template>
  <div class="">
    <van-search
    v-model="value"
    show-action
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="onCancel"
  />
  <div class="hotBook">
       <div class="hot">热门书籍</div>
       <div class="" v-for="(item,index) in 6" :key="index">
       	 <div class="hotDesc" >
       	 	<span :style="index<=2?'color:red':''">{{index+1}}</span>
       	 <span class="bookName">神奇图书馆 第二部</span></div>
       </div>
  </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
       value: '',
    }
  },
  methods: {
    onSearch(val) {
      this.$toast(val);
    },
    onCancel() {
        this.$toast('取消');
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hotBook{
	width: 94%;
	margin: 0 auto;
}
.hot{
	font-size: 20px;
	font-weight:500;
    color:rgba(34,34,34,1);
    text-align: left;
    padding: 6px;
}
.hotDesc{
	text-align: left;
	font-size: 14px;
	padding: 12px;
}
.bookName{
	margin-left: 12px;
}
</style>
