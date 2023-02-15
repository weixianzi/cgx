import router from "./index.js"
import useBreadStore from "../stores/breadCrumb.js"
import usePermission from "../stores/permission.js"
import NProgress from 'nprogress'

router.beforeEach(async(to,from)=>{
    NProgress.start()
    let permission = usePermission()
    let token = sessionStorage.getItem("lf-token")
    if(!token){
        if(to.path!=="/login"){
            return{path:"/login"}
        }
    }else{
        if(permission.menuList.length===0){
           await permission.FETCH_GETLIST()
            return{
                ...to
            }
        }
    }
})

router.afterEach((to,from)=>{
    NProgress.done()
    let breadStore = useBreadStore()
    breadStore.$patch(state=>{
        state.datas = to.matched
    })
})

export default router