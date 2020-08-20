<template>
  <div class="box">
    {{list}}
  </div>
</template>

<script>
var that
import { getDatadesc } from '@/api'
export default {
  data () {
    return {
        list:""
    }
  },
  created(){
    getDatadesc(this.$route.params.id).then(res=>{
        this.list=res.data.item.dataContent
    })
  },
  methods:{
   
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
  text-align: left;
  text-indent:24px;
}
</style>
