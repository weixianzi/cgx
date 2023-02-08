<template>
    <div class="box">
        <h1 style="color:white;" class="title">{{ isShow?"男同交友系统":"用短信登入⚣" }}</h1>
        <video class="video" src="@/assets/宇多田光 EVA Beautiful World MV高清1080P重制版-.mp4" loop="loop" autoplay="true"></video>
        <a href="" class="cut" @click.prevent="cut">{{ isShow?"点我切换短信登入":"返回常规登入" }}</a>
    </div>
        <commonLogin v-if="isShow"></commonLogin>
        <mesLogin v-else></mesLogin>
</template>

<script setup>
    import commonLogin from "@/components/login/commonLogin.vue"
    import mesLogin from "@/components/login/mesLogin.vue"
    import {ref} from "vue"
    let isShow = ref(true)
    let cut = ()=>{
        isShow.value = !isShow.value
    }
</script>

<style lang="less" scoped>
.video{
 position: fixed;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
}
.title{
    position: absolute;
    z-index: 999;
    left: 110px;
    top: 350px;
    font-size: 30px;
    background: linear-gradient(to right, red, blue);
    color: transparent;
}
.cut{
    position: fixed;
    left: 150px;
    top: 740px;
    z-index: 999;
    color: #09dec5;
}
</style>