<template>
  <div class="">
      <img src="../assets/images/nodata.png" alt="" width="88px" >
       <div class="desc">{{desc}}</div>
  </div>
</template>

<script>

export default {
  props:['desc'],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.desc{
    color: #ccc;
}
</style>
