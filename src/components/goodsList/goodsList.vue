<template>
  <div class="">
     <div class="box" v-for="(item,index) in goods" :key="index" @click="godesc(item)">
       <van-image :src="item.smallImage" class="img"  radius="6"/>
       <div class="right">
            <div class="name">{{item.name}}</div>
            <div class="price"><span class="fh">￥</span><span class="num">{{item.price}}</span></div>
       </div>
     </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'
import goodsItem from '../goodsItem/item'
export default {
   components:{
     goodsItem
   },
  data () {
    return {
    }
  },
  computed:{
      ...mapGetters({goods:'SELECTED_GOODS',clearedNum:'CLEARED_NUM'}),
   },
created(){
},
methods:{
  godesc(item){
    this.$router.push(`/goodsDetails/${item.id}`)
  }    
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
    width: 96%;
    margin: 10px auto;
    height: 100px;
    box-shadow:0px 0px 4px 0px rgba(0,0,0,0.1);
    border-radius: 8px;
    display: flex;
}
.img{
    width: 88px;
    height: 88px;
    margin: auto 10px;
}
.right{
    text-align: left;
}
.name{
  margin-top: 6px;
  font-size: 16px;
}
.price{
    color: red;
    margin: 10px 0;
}
.num{
    font-size: 16px;
}
.show_decoration{
  color: #ccc;
  font-size: 10px!important;
  display:inline-block;
  text-decoration:line-through;
  margin-left: 4px;
}
.noshow{
  font-size: 14px;
}
</style>
