import http from "../request/index"

export let getShop =() =>http.get("/product/get_product",{
    params:{
        category_id:"20210827165510715"
    }
})

// 获取订单管理
export let getOrder = (order_id)=>http.post("/order/get_order",{
    order_id
})

// 获取单挑商品
export let getOnly = (product_id)=>http.get("/product/get_product",{
    params:{
        product_id
    }
})

// 提交订单
export let postOrder = (product_id,quantity)=>http.post("/order/pre_order",{
    product_id,
    quantity
})

// 发起支付
export let payment = (order_id)=>http.post("/pay/payment",{
    order_id
})

// 查询订单详情
export let getOrderMes = (order_id)=>http.post("/order/get_order",{
    order_id
})

// 查询订单支付状态
export let orderPayState = (order_id)=>http.get("/order/query_order_status",{
    params:{
        order_id
    }
})