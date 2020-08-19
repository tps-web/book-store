<template>
    <van-pull-refresh  v-model="isLoading" @refresh="onRefresh">
        <van-list  v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <!-- 内容 -->
        </van-list>
    </van-pull-refresh>
</template>

<script>

export default {
 
  data () {
    return {
      loading: false,
    finished: false,
    isLoading: false,
    goodList: [], 
    qureyList: {
        pageNo: 0,
        pageSize: 10
    }, 
    }
  },
   methods: {
      getList() {
        record(this.qureyList).then(res => {
            this.loading = false;
            this.isLoading = false;
            if (res.data.errno == 0) {
                let data = res.data.data
                if (data.length > 0) {
                    this.finished = false;
                    this.goodList = this.goodList.concat(data)
                } else {
                    this.finished = true;
                }
            } else {
                this.finished = true;
            }
        })
    },
    
    // 下拉加载
    onLoad() {
        this.qureyList.pageNo++;
        this.getList();
    },
    
    // 上拉刷新
    onRefresh() {
        this.goodList = [];
        this.qureyList.pageNo = 1;
        this.getList();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
