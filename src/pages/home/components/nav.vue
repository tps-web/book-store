<template>
  <div id="wrapper">
    <van-grid :column-num="5"
              :border="false">
      <van-grid-item v-for="(nav,index) in 5"
         :key="index"
         icon="photo-o"
         text="菜单"
         @click="gotoCategory(index)" to=""/>
    </van-grid>
  </div>
</template>

<script type="text/javascript">

export default {
  props: {
    nav_list: Array
  },
  data () {
    return {

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

