<template>
  <div id="wrapper">
    <van-grid :column-num="5"
              :border="false">
      <van-grid-item v-for="(nav,index) in list"
         :key="index"
         icon="photo-o"
         :text="nav.nav"
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
       list:[{nav:'生理需求'},{nav:'安全需求'},{nav:'社交需求'},{nav:'尊重需求'},{nav:'自我实现'}]
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

