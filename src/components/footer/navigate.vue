<template>
    <div >
       <van-tabbar route >
         <van-tabbar-item icon="wap-home-o" to="/">主页</van-tabbar-item>
         <van-tabbar-item icon="shopping-cart-o" badge="1" to="/cart">书架</van-tabbar-item>
         <van-tabbar-item icon="user-o" to="/me">我的</van-tabbar-item>
       </van-tabbar>
    </div>
</template>

<script>
export default {
    name:'navigate',
} 
</script>

