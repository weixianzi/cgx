import { defineStore } from 'pinia'

const useUserInfoStore = defineStore('userInfo',{
    state(){
        return{
            userInfo:{}
        }
    }
})

export default useUserInfoStore