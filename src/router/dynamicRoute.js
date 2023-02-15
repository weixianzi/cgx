
let dynamicRoutes = [
    {
        name:"home",
        path:"/",
        component:()=>import(/* wecpackChunkName:"home" */"@/pages/home/index.vue"),
        children:[]
      }
]

export default dynamicRoutes