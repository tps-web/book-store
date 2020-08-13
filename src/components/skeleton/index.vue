<template>
  <content-loader
    :width="400"
    :height="800"
    :speed="1"
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <!-- 搜索 -->
    <rect x="6" y="18" rx="5" ry="5" width="100" height="20" />
    <rect x="123" y="18" rx="0" ry="0" width="274" height="20" />
    <!-- 轮播图 -->
    <rect x="11" y="54" rx="0" ry="0" width="384" height="110" />
     <!-- nav -->
    <circle cx="36" cy="200" r="20" />
    <rect x="13" y="230" rx="0" ry="0" width="51" height="10" />
    <circle cx="124" cy="200" r="20" />
    <rect x="101" y="230" rx="0" ry="0" width="51" height="10" />
    <circle cx="211" cy="200" r="20" />
    <rect x="184" y="230" rx="0" ry="0" width="51" height="10" />
    <circle cx="289" cy="200" r="20" />
    <rect x="263" y="230" rx="0" ry="0" width="51" height="10" />
    <circle cx="371" cy="200" r="20" />
    <rect x="345" y="230" rx="0" ry="0" width="51" height="10" />
    <!-- 新书上架 -->
    <rect x="20" y="270" rx="5" ry="5" width="100" height="20" />
    <rect x="320" y="270" rx="5" ry="5" width="60" height="20" />
    <rect x="20" y="310"  width="110" height="110" />
    <rect x="150" y="310"  width="110" height="110" />
    <rect x="270" y="310"  width="110" height="110" />
    <!-- 精选书单 -->
    <rect x="20" y="440" rx="5" ry="5" width="100" height="20" />
    <rect x="320" y="440" rx="5" ry="5" width="60" height="20" />
    <rect x="20" y="470"  width="110" height="110" />
    <rect x="150" y="470"  width="110" height="110" />
    <rect x="270" y="470"  width="110" height="110" />
    <!-- 猜你喜欢 -->
     <rect x="150" y="600" rx="5" ry="5" width="100" height="20" />
     <rect x="20"  y="640" rx="5" ry="5" width="160" height="160" />
     <rect x="220"  y="640" rx="5" ry="5" width="160" height="160" />

  </content-loader>
</template>

<script>
  import { ContentLoader } from "vue-content-loader"

  export default {
    components: { ContentLoader }
  }
</script>

