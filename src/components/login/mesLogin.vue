<template>
    <div class="box">
        <el-form ref="smsFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
            class="demo-ruleForm">
            <el-form-item label="手机号" prop="phone">
                <a href="" @click.prevent="getVcode" style="color:black;" class="getvcode">{{ msg }}</a>
                <el-input v-model="ruleForm.phone" type="username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="验证码" prop="VCode">
                <el-input v-model="ruleForm.VCode" type="username" autocomplete="off" @keydown.enter="smsLogin(smsFormRef)" />
            </el-form-item>
            <el-form-item class="submit">
                <el-button type="primary" @click="smsLogin(smsFormRef)">登陆</el-button>
                <el-button type="primary" @click="resetForm(smsFormRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script setup>
import { reactive, ref } from 'vue'
import * as api from "@/api/login.js"
import router from "@/router/index.js"
import useUserInfoStore from "@/stores/userInfo.js"
import {ElLoading} from "element-plus"

let userInfo = useUserInfoStore()

const smsFormRef = ref()

let msg = ref("点击获取验证码")

let isCountDown = ref(true)

const validatePhone = async (rule, value, callback) => {
    let reg = /^1[3456789]\d{9}$/
    let res = reg.test(value)
    if (!res) {
        callback(new Error("火星手机号？"))
    } else {
        callback()
    }
}
const validateVcode = async (rule, value, callback) => {
    if (!value) {
        callback(new Error("能不能把发给你的验证码输入进来啊？？？"))
    } else {
        callback()
    }
}

const ruleForm = reactive({
    phone: '',
    VCode: ''
})

const rules = reactive({
    phone: [{ validator: validatePhone, trigger: 'blur' }],
    VCode: [{ validator: validateVcode, trigger: 'blur' }]
})

const smsLogin = (formEl) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            try {
                const loading = ElLoading.service({
                    lock: true,
                    text: 'Loading',
                    background: 'rgba(0, 0, 0, 0.7)',
                })
                let res = await api.verifyCode(ruleForm.VCode)
                sessionStorage.setItem("lf-token", res.data.token)
                userInfo.userInfo = res.data.userInfo
                router.push("/")
                loading.close()
            } catch (e) {
                console.log(e)
                loading.close()
            }
        } else {
            console.log('error submit!')
            return false
        }
    })
}

const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
}

const getVcode = async () => {
    let count = 60
    try {
    if (isCountDown) {
            await api.getPhoneCode(ruleForm.phone)
            let timeInterval = setInterval(() => {
                msg.value = `${count}秒后再发送`
                count--
                if (count < 0) {
                    isCountDown = true
                    msg.value = "点击获取验证码"
                    clearInterval(timeInterval)
                }
            }, 1000)
            isCountDown = false
        } 
        }catch (e) {
            console.log(e)
            return
    }
}
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
    left: 60px;
    top: 170px;
}

.getvcode {
    position: absolute;
    left: 180px;
    z-index: 999;
}
</style>