import {defineStore} from "pinia"
import * as api from "@/api/userAuthority.js"
import routers from "@/router/selfRouter.js"
import recucation from "../utils/recuaction"
import dynamicRoutes from "@/router/dynamicRoute"
import staticRoutes from "@/router/statical"
import router from "@/router/index.js"

let usePermission = defineStore("permission",{
    state(){
        return {
            menuList:[],
            isQuit:true
        }
    },
    actions:{
       FETCH_GETLIST(){
        return api.getUserAuthority()
        .then(res=>{
           let useRoute = recucation(res.data.menuList,routers)
           this.menuList = useRoute
           let target = dynamicRoutes.find(item=>item.path==="/")
           target.children = [...staticRoutes,...useRoute]
           router.addRoute(target)
        })
        }
    }
})

export default usePermission