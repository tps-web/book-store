<template>
  <div>
   <item :status="status"/>
  </div>
</template>

<script>
var that
import item from './components/item'
export default {
  components:{item},
  data () {
    return {
       status:6
    }
  },
  created(){
 
  },
  methods:{

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
