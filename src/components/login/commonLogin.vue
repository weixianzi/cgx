<template>
    <div class="box">
        <el-form class="vcode" v-loading="loading">
            <div class="inner" v-html="qrImg" @click="changeVcode"></div>
        </el-form>
        <el-form ref="ruleFormRef" :model="loginForm" status-icon :rules="rules" label-width="120px"
            class="demo-loginForm">
            <el-form-item label="账号" prop="userName">
                <el-input v-model="loginForm.userName" type="username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="passWord">
                <el-input v-model="loginForm.passWord" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="验证码" prop="qrCode">
                <el-input v-model="loginForm.qrCode" @keydown.enter="submitForm(ruleFormRef)" />
            </el-form-item>

            <el-form-item class="submit">
                <el-button type="primary" @click="submitForm(ruleFormRef)">登陆</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script setup>
import { reactive, ref, onMounted } from 'vue'
import * as api from "@/api/login.js"
import useUserInfoStore from "@/stores/userInfo.js"
import { useRouter } from 'vue-router';
import {ElLoading} from "element-plus"
let userInfo = useUserInfoStore()

let router = useRouter()

const ruleFormRef = ref()

let fullLoading = ref(false)

// 校验验证码
const checkQr = async (rule, value, callback) => {
    if (value.length === 5) {
        try {
            callback()
        } catch (e) {
            console.log(e)
        }
    } else {
        return callback(new Error('验证码有误'))
    }
}

const validatePassword = (rule, value, callback) => {
    let regQr = /^[a-zA-Z0-9_-]{3,16}$/;
    let res = regQr.test(value)
    if (!value) {
        return callback(new Error('密码为必填'))
    }
    if (!res) {
        return callback(new Error('密码错误'))
    } else {
        callback()
    }
}

const validateUserName = (rule, value, callback) => {
    let regQr = /^[a-zA-Z0-9_-]{3,16}$/;
    let res = regQr.test(value)
    if (!value) {
        return callback(new Error('账号为必填'))
    }
    if (!res) {
        return callback(new Error('账号格式错误'))
    } else {
        callback()
    }
}

const loginForm = reactive({
    userName: '',
    passWord: '',
    qrCode: ''
})

const rules = reactive({
    userName: [{ validator: validateUserName, trigger: 'blur' }],
    passWord: [{ validator: validatePassword, trigger: 'blur' }],
    qrCode: [{ validator: checkQr, trigger: 'blur' }],
})

let verifyVcode = async () => {
    try {
        let res = await api.verifyVcode(loginForm.qrCode.toLowerCase())
        return Promise.resolve(res)
    } catch (e) {
        getQrCode()
        return Promise.reject(e)
    }
}

let qrImg = ref("")

// 提交事件
const submitForm = (formEl) => {
    const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            try {
                let res = await verifyVcode()
                if (res) {
                    let { userName, passWord } = loginForm
                    let res = await api.commonLogin(userName, passWord)
                    sessionStorage.setItem("lf-token", res.data.token)
                    userInfo.userInfo = res.data.userInfo
                    router.push("/")
                    loading.close()
                }
            }catch(e){
                getQrCode()
                loading.close()
            }
    } else {
            console.log('error submit!')
            return false
        }
    })
}

let loading = ref(true)

// 封装获取验证码
let getQrCode = async () => {
    loading.value = true
    try {
        let res = await api.getQrCode()
        qrImg.value = res.data.img
        loading.value = false
    } catch (e) {
        console.log(e)
    }
}

let changeVcode = () => {
    getQrCode()
}
onMounted(() => {
    getQrCode()
})
</script>
  
<style lang="less" scoped>
.box {
    position: fixed;
    width: 400px;
    height: 500px;
    background-color: rgba(#1e1e1e, .8);
    top: 300px;
}

.el-form {
    transform: translate(-50%, -50%);
    position: relative;
    top: 50%;
    left: 38%;
}

:deep(.el-form-item__label) {
    color: white;
}

.submit {
    position: absolute;
    left: 96px;
    top: 170px;
}

.vcode {
    position: relative;
    width: 180px;
    height: 30px;
    z-index: 998;
    top: 330px;
    left: 260px;
    cursor: pointer;
}

.inner {
    width: 180px;
    position: absolute;
    left: 40px;
    bottom: -6px;
}
</style>