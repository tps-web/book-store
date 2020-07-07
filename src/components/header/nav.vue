<template>
    <div>
    <van-nav-bar
    :title="title"
    left-text=""
    left-arrow
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

<style>

</style>
