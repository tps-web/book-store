<template>
  <div class="">
    <Tab :tabNameList="tabNameList"/>
  </div>
</template>

<script>
import Tab from '@/components/tab/index'
import {listByParentId} from '@/api'
export default {
  components:{
  	Tab
  },
  data () {
    return {
      tabNameList:''
    }
  },
  created(){
    // console.log(this.$route.params.id)
     listByParentId(this.$route.params.id).then(res=>{
       console.log(res)
      //  this.tabNameList=res.data.items.storyCategoryTypeList
       this.tabNameList=res.data.items.storyCategoryTypes
      //  console.log(res.data.items.storyCategoryTypeList)
     })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
