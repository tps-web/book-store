<template>
  <div class="">
      
     <div class="box" v-for="(item,index) in list" :key="index" @click="godesc(item)">
       <div class="imgBox"> 
           <van-image :src="item.bookPic" class="img"  radius="6"/>
       </div>
       <div class="right">
            <div class="name">{{item.bookName}}</div>
            <div class="price"><span class="fh">￥</span><span class="num">{{item.bookPrice|decimals}}</span></div>
       </div>
     </div>
  </div>
</template>

<script>
// import { mapMutations, mapState, mapGetters } from 'vuex'
import goodsItem from '../goodsItem/item'
import {getOrderlistAll} from '@/api'
var that
export default {
   components:{
     goodsItem
   },
  data () {
    return {
           list:[],  
    }
  },
  computed:{
   },
created(){
    that=this
    this.getItem()
},
mounted(){
  if (window.history && window.history.pushState) {
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', this.goBack, false);
  }
},
destroyed(){
  window.removeEventListener('popstate', this.goBack, false);
},
methods:{
   goBack(){
    var path=sessionStorage.getItem('path')
    var pathChildren= sessionStorage.getItem('pathChildren')
    this.$router.replace({path: `/bugAndRent/${path}/${pathChildren}`});
    //replace替换原路由，作用是避免回退死循环
  },
  godesc(item){
    this.$router.replace(`/goodsDetails/${item.bookId}`)
  },
     getItem(){
        getOrderlistAll(this.$route.params.id).then(res=>{
             this.list=res.data.items
        })
    },
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
.imgBox{
    display:-webkit-flex;
    display:flex;
    -webkit-flex-flow : column nowrap;
    flex-flow : column nowrap;
    /* background-color:#eee; */
    width: 78px;
    height: 88pxpx;
    margin-right: 10px;
    padding: 4px 6px;
}
.img{
    width: 100%;
    margin-left : auto;
    margin-right : auto;
    margin: auto;
}
/* .img{
    width: 88px;
    height: 88px;
    margin: auto 10px;
} */
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

</style>
