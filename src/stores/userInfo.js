import { defineStore } from 'pinia'

const useUserInfoStore = defineStore('userInfo',{
    state(){
        return{
            userInfo:{}
        }
    },
    persist:[
        {
            path:["userInfo"],
            storage:sessionStorage
        }
    ]
})

export default useUserInfoStore