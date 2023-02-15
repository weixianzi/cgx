import { defineStore } from "pinia";

let useBreadStore = defineStore("bread",{
    state(){
        return{
            datas:[]
        }
    }
})

export default useBreadStore