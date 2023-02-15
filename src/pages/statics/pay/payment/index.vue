<template>
    <div class="pay-container">
        <!-- 生成微信支付二维码 -->
        <div class="erwei">
            <img :src="QrCode" alt="">
        </div>
        <div class="miaoshu">
            <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wechat_pay"></use>
        </svg>
        <span>使用微信进行支付</span>
        </div>
        <el-descriptions title="订单详情">
            <el-descriptions-item label="订单号">{{ userInfo?.order_id }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ userInfo?.create_time }}</el-descriptions-item>
            <el-descriptions-item label="产品名称">{{ userInfo?.orderDetail[0].productName }}</el-descriptions-item>
            <el-descriptions-item label="商品描述">{{ userInfo?.orderDetail[0].description }}</el-descriptions-item>
            <el-descriptions-item label="购买数量">{{ userInfo?.orderDetail[0].quantity }}</el-descriptions-item>
            <el-descriptions-item label="购买用户">{{ userInfo?.user_nickname }}</el-descriptions-item>
            <el-descriptions-item label="手机号">{{
            userInfo?.user_phone?userInfo.user_phone:
            "没有手机号码"}}</el-descriptions-item>
            <el-descriptions-item label="总价格">
                {{ userInfo?.total_fee }}
            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script setup>
import * as api from "@/api/shop.js"
import { onMounted, ref, reactive, onUnmounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { ElMessage, ElMessageBox } from 'element-plus'
import QRCode from 'qrcode'

let route = useRoute()

let router = useRouter()

let { order_id } = route.query

let QrCode = ref("")

let userInfo = ref()

let timeOut = null

let getOrder = async () => {
    try {
        let res = await api.getOrderMes(order_id)
        userInfo.value = res.data.data
        if (res.data.data.order_status === 1) {
            // 发起支付
            let code = sessionStorage.getItem(order_id)
            if (code) {
                QRCode.toDataURL(code)
                        .then(url => {
                            QrCode.value = url
                            console.log(url)
                        })
                        .catch(err => {
                            console.error(err)
                        })
            } else {
                try {
                    let res = await api.payment(order_id)
                    console.log(res)
                    QRCode.toDataURL(res.data.code_url)
                        .then(url => {
                            QrCode.value = url
                            console.log(url)
                        })
                        .catch(err => {
                            console.error(err)
                        })
                    let { code_url } = res.data
                    sessionStorage.setItem(order_id, code_url)
                } catch (e) {
                    console.log(e)
                }
            }
        } else {
            switch (res.data.data.order_status) {
                case 0:
                    ElMessage('未提交')
                case 2:
                    ElMessage('已经取消')
                case 3:
                    ElMessage('无效订单')
                case 4:
                    ElMessage('退货')
            }
            timeOut = setTimeout(() => {
                ElMessage('两秒后将跳回支付界面')
                router.push("/Vipmanage/orderManage")
            }, 2000)
        }
    } catch (e) {
        console.log(e)
    }
}
getOrder()

// 轮询查看订单结果
let lunXun = ()=>{
        let interval = setInterval(async()=>{
           try{
            let res = await api.orderPayState(order_id)
           if(res.data.state){
            router.push("pay/paysuccess")
           }
           }catch(e){
            console.log(e)
           }
        },3000)
        return interval
}

let interval = lunXun()

onUnmounted(() => {
    if (timeOut) {
        clearInterval(timeOut)
    }
    clearInterval(interval)
})
</script>

<style lage="less" scoped>
    .erwei{
        position: relative;
        left: 46%;
    }
    .miaoshu{
        position: relative;
        left: 46%;
    }
</style>