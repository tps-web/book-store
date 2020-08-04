<template>
  <div id="wrapper">
    <van-grid :column-num="5"
              :border="false">
      <van-grid-item v-for="(nav,index) in navList"
         :key="index"
         icon="photo-o"
         :text="nav.name"
         @click="gotoCategory(index)" to=""/>
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
    for(var i =0 ;i<5;i++){
      this.navList.push(this.navItem.data[i])
    }
  },
  components: {

  },
  methods: {
    gotoCategory (index) {
      // this.$router.push({ name: 'category', params: { currentIndex: index } })
    }
  }
}
</script>

<style scoped>

</style>

