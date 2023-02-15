    let staticRoutes = [
        {
            path:"pay",
            component:()=>import(/* webpackChunkName:"pay" */"@/pages/statics/pay/index.vue"),
            children:[
                {
                    path:"payfaild",
                    component:()=>import(/* webpackChunkName:"pay" */"@/pages/statics/pay/payfaild/index.vue"),
                },
                {
                    path:"paysuccess",
                    component:()=>import(/* webpackChunkName:"pay" */"@/pages/statics/pay/paysuccess/index.vue"),
                },
                {
                    path:"payment",
                    component:()=>import(/* webpackChunkName:"pay" */"@/pages/statics/pay/payment/index.vue"),
                }
            ]
        },
        {
            path:"payorder",
            component:()=>import(/* webpackChunkName:"pay" */"@/pages/statics/payorder/index.vue"),
        },
        {
            path:"catch(.*)",
            component:()=>import(/* webpackChunkName:"404" */"@/page/statics/404/index.vue")
        }
    ]

    export default staticRoutes