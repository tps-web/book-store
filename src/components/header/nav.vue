<template>
    <div class="top">
    <van-nav-bar
    :title="title"
    left-text=""
    left-arrow
    :fixed=true
    @click-left="onBack"
    />
 </div>
</template>

<script>
export default {
    name:'headerNav',
    props:{
        title:String,
    },
    methods: {
        onBack() {
        history.back();
        },
    }
}
</script>

<style scoped>
.top{
    margin-bottom: 50px;
}
</style>
