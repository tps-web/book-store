<template>
  <div class="content">
    <div class="desc" v-html="introduction.introduction">
      <!-- {{introduction.introduction}} -->
    </div>
    <van-image :src="introduction.squareImage" />
  </div>
</template>

<script>

export default {
  props:{
    introduction:{
      type:Object,
    }
  },
  data () {
    return {
    }
  },
  created(){
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
	width: 92%; 
	margin: 20px auto 8px;
}
.desc{
  	margin: 10px 0;
  	text-align:left;
    font-size:12px;
    font-weight:400;
    color:rgba(34,34,34,1);
}
</style>
