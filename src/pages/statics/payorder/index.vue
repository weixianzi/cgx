<template>
    <lftable :columns="columns" :tableData="tableData">
        <template v-slot:imageUrl="{ row }">
            <img :src="row.imageUrl" alt="">
        </template>
        <template v-slot:number="{row}">
            <el-input-number v-model="num" :min="1" :max="10000"/>
        </template>
        <template v-slot:total="{row}">
            <h1 style="color:aqua">{{ total }}</h1>
        </template>
    </lftable>
    <div class="total-fee">
        <div class="box-wrap">
            <div class="box-shadow">
                <span class="realpay--title" data-spm-anchor-id="a210c.1.0.i0.52681deblyKpHg">实付款：</span>
                <span class="realpay--price-symbol">¥</span>
                <span class="realpay--price" style="color: rgb(255, 80, 0)">{{ total }}</span>
                <div class="order-confirmAddr">
                    <div class="confirmAddr-addr-user">
                        <span class="confirmAddr-title">充值详情：</span><span
                            class="confirmAddr-pro">{{ description }}</span>
                    </div>
                    <div class="confirmAddr-addr">
                        <span class="confirmAddr-title">充值账户：</span><span class="confirmAddr-usn">{{ userName }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn">
            <el-button type="danger" @click="toPay">提交订单</el-button>
        </div>
    </div>

</template>

<script setup>
import lftable from "@/components/lfTable/index.vue"
import { onMounted, ref, computed } from "vue";
import { useRoute,useRouter } from "vue-router"
import * as api from "@/api/shop.js"
import useUserInfoStore from "@/stores/userInfo.js"
import { ElMessage, ElMessageBox } from 'element-plus'

let userName = ref("")

let description = ref("")

let userInfoStore = useUserInfoStore()

let router = useRouter()

let num = ref(1)

let price = ref()

let route = useRoute()

let {id} = route.query

userName.value = userInfoStore.userInfo.nickname

let targetShop = () => api.getOnly(route.query.id)

let tableData = ref([])

onMounted(async () => {
    try {
        let res = await targetShop()
        tableData.value = res.data.data
        description.value = res.data.data[0].description
        price.value = res.data.data[0].price
    } catch (e) {
        console.log(e)
    }
})

let columns = ref([
    {
        label: '产品图片',
        prop: 'imageUrl'
    },
    {
        label: '单价',
        prop: 'price'
    },
    {
        label: '数量',
        prop: 'number'
    },
    {
        label: '小计',
        prop: 'total'
    }
])

let total = computed(()=>{
    return price.value * num.value
})

let toPay = ()=>{
    ElMessageBox.confirm(
    '确定买？',
    '警告',
    {
      confirmButtonText: '买',
      cancelButtonText: '不买了',
      type: 'warning',
    }
  )
    .then(async() => {
        try{
            let res = await api.postOrder(id,num.value)
            router.push({path:"/pay/payment",query:{order_id:res.data.order_id}})
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

<style lang="less" scoped>
.price {
    color: #ff0036;
    font-weight: bolder;
}

.total_fee {
    font-size: 16px;
    color: #ff0036;
}

.el-button {
    width: 180px;
    border-radius: 0;
}

.confirm-title {
    text-align: left;
    margin-bottom: 30px;
}

.pre-order {
    padding: 80px 100px 0 100px;
}

.total-fee {
    margin-top: 50px;
    text-align: right;
}

.box-wrap {
    display: inline-block;
    border: 1px solid #ff0036;

    .box-shadow {
        border: 3px solid #fff0e8;
        min-width: 300px;
        padding: 10px 5px 10px 20px;

        .realpay--title {
            font-weight: 700;
            color: #333;
        }

        .realpay--price-symbol {
            font-size: 26px;
            margin-right: 4px;
            color: #999;
        }

        .realpay--price {
            color: #ff0036;
            font: 700 26px tahoma;
        }

        .order-confirmAddr {
            line-height: 1.6;
            font-weight: bolder;
            margin-top: 10px;
            font-size: 16px;

            // text-align: center;
            // font-family: "PingFang SC";
            .confirmAddr-usn {
                color: #ff0036;
                font-size: 20px;
            }

            .confirmAddr-pro {
                color: goldenrod;
                font-size: 16px;
            }
        }
    }
}

img {
    width: 100px;
    height: 70px;
}
</style>