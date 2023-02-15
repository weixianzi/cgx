<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="loginData" border style="width: 100%">
        <el-table-column prop="username" label="登录账户" width="350" sortable />
        <el-table-column prop="lastLogin.loginTime" label="上次登录时间" width="350" sortable />
        <el-table-column prop="lastLogin.ip" label="上次登录ip" width="350" sortable />
        <el-table-column prop="nowLogin.loginTime" label="本次登录时间" sortable />
    </el-table>
</template>
<script setup>
import { ref, onBeforeMount } from 'vue'
import * as api from "@/api/login.js"
let loginData = ref([])
onBeforeMount(async () => {
    try {
        let res = await api.getLoginDate()
        loginData.value = res.data.data
        console.log(res)
    } catch (e) {
        console.log(e)
    }
})
</script>

<script>
export default {
    meta: {
        id: "1",
        name: "管理首页",
        title: "glsy",
        routername: "welcome",
        iconFont: "#icon-shouye1"
    }
}
</script>