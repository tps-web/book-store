<template>  
  <div id="wrapper">
    <van-grid :column-num="5"
              :border="false">
      <van-grid-item v-for="(nav,index) in navList"
         :key="index"
         :icon="nav.icon"
         :text="nav.name"
         @click="gotoCategory(nav)" />
    </van-grid>
  </div>
</template>

<script type="text/javascript">

export default {
   props:{
    navItem:{
       type:Object
    }
  },
  data () {
    return {
       navList:[]
    }
  },
  created(){
    // console.log(this.navItem.data.data)
    for(var i =0 ;i<5;i++){
      // this.navList.push(this.navItem.data[i])
      this.navList.push(this.navItem.data.data[i])
    }
  },
  components: {

  },
  methods: {
    gotoCategory (item) {
      // console.log(item)
      this.$router.push(`/move/${item.id}`)
      // this.$router.push({ name: 'category', params: { currentIndex: index } })
    }
  }
}
</script>

<style scoped>

</style>

