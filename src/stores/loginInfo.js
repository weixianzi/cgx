import {defineStore} from "pinia"

let useLoginStore = defineStore("useLogin",{
    state(){
        return{
            loginInfo:[]
        }
    },
    persist:[
        {
            path:["loginInfo"],
            storage:sessionStorage
        }
    ]
})
export default useLoginStore