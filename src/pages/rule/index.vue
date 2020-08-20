<template>
  <div>
      <van-cell  v-for="(item,index) in list" :value="item.dataType" :key="index" @click="goDesc(item)"/>
  </div>
</template>

<script>
var that
import { getAllDataByRule } from '@/api'
export default {
  data () {
    return {
        list:""
    }
  },
  created(){
    getAllDataByRule().then(res=>{
        this.list=res.data.rows
    })
  },
  methods:{
    goDesc(item){
        this.$router.push(`/dataDesc/${item.id}`)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
