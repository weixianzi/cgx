<template>
    <lfTable :columns="columns" :tableData="tableData">
        <template v-slot:action="{row}">
            <el-button type="success" @click="toPay(row)">去支付</el-button>
        </template>
        <template v-slot:imageUrl="{row}">
            <img :src="row.imageUrl" alt="">
        </template>
    </lfTable>
</template>

<script setup>
import lfTable from "@/components/lfTable/index.vue"
import * as api from "@/api/shop.js"
import { onMounted,reactive,ref } from "vue";
import {useRouter} from "vue-router"
import { ElMessage, ElMessageBox } from 'element-plus'

let router = useRouter()

let columns = reactive([
    {
        label: "产品图片",
        value: "",
        prop: "imageUrl"
    },
    {
        label: "产品名称",
        value: "",
        prop: "productName"
    },
    {
        label: "产品描述",
        value: "",
        prop: "description"
    },
    {
        label: "价格（元）",
        value: "",
        prop: "price"
    },
    {
        label: "库存",
        value: "",
        prop: "inventory"
    },
    {
        label: "操作",
        value: "",
        prop: "action"
    }
])

let tableData = ref([])

let getShopList = async () => {
    try {
        let res = await api.getShop() 
        tableData.value = res.data.data
    } catch (e) {
        console.log(e)
    }
}

getShopList()

let toPay = async (row)=>{
    ElMessageBox.confirm(
    '确定买？',
    '警告',
    {
      confirmButtonText: '买',
      cancelButtonText: '不买了',
      type: 'warning',
    }
  )
    .then(() => {
        try{
            router.push({path:"/payorder",query:{id:row.product_id}})
             ElMessage({
        type: 'success',
        message: '跳转成功',
      })
        }catch(e){
            console.log(e)
        }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消',
      })
    })
}

</script>

<script>
export default {
    meta: {
        id: "11",
        name: "Vip充值",
        title: "vipCharge",
        routername: "orderManage",
        iconFont: "#icon-shangpinguanli"
    }
}
</script>

<style lage="less" scoped>
    img{
        width: 100px;
        height: 50px;
    }
</style>