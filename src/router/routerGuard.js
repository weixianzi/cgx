import router from "./index.js"

router.beforeEach((to,from)=>{
    console.log(to)
    console.log(from)
    let token = sessionStorage.getItem("lf-token")
    if(!token){
        if(to.path!=="/login"){
            router.push("/login")
        }else{
            return
        }
    }
})
export default router