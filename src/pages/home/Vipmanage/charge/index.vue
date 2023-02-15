<template>
    <lfTable :columns="columns" :tableData="tableData">
        <template v-slot:orderDetail[0].imageUrl="{ row }">
            <img :src="row.orderDetail[0].imageUrl" alt="">
        </template>
        <template v-slot:action="{ row }">
            <el-button @click="pay(row)" type="primary" :disabled="row.order_status === 4 || row.pay_status === 1">去购买</el-button>
            <el-button type="danger">删除</el-button>
        </template>
        <!-- 支付状态 -->
        <template v-slot:pay_status="{ row }">
            {{ row.pay_status === 0 ? '未支付' : '已支付' }}
        </template>
        <!-- 订单状态 -->
        <template v-slot:order_status="{ row }">
            {{ orderStatus(row) }}
        </template>
    </lfTable>
</template>

<script setup>
import lfTable from "@/components/lfTable/index.vue"
import * as api from "@/api/shop.js"
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router"

let router = useRouter()

let columns = reactive([
    {
        label: '产品图片',
        prop: 'orderDetail[0].imageUrl'
    }, {
        label: '产品编号',
        prop: 'order_id'
    }, {
        label: '产品名称',
        prop: 'orderDetail[0].productName'
    }, {
        label: '数量',
        prop: 'orderDetail[0].quantity'
    }, {
        label: '总价格',
        prop: 'total_fee'
    }, {
        label: '创建时间',
        prop: 'create_time'
    }, {
        label: '支付状态',
        prop: 'pay_status'
    }, {
        label: '订单状态',
        prop: 'order_status'
    }, {
        label: '操作',
        prop: 'action'
    }
])

let tableData = ref([])

let getOrder = async () => {
    try {
        let res = await api.getOrder()
        tableData.value = res.data.data
    } catch (e) {
        console.log(e)
    }
}

getOrder()

let pay = (row) => {
    console.log(row)
    router.push("/pay/payment?order_id=" + row.order_id)
}

//获取订单状态
let orderStatus = (row) => {
    switch (row.order_status) {
        case 0:
            return '未提交'
        case 1:
            return '提交成功'
        case 2:
            return '已经取消'
        case 3:
            return '无效订单'
        case 4:
            return '交易关闭'
        case 5:
            return '退货'
    }
}
</script>

<script>
export default {
    meta: {
        id: "12",
        name: "订单管理",
        title: "order",
        routername: "charge",
        iconFont: "#icon-icon-test"
    }
}
</script>

<style scoped>
img {
    height: 50px;
    width: 100px;
}
</style>