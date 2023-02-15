import http from "@/request/index.js"

// 获取用户权限
export let getUserAuthority = () =>http.get("/permission/getMenuList")

// 获取学员信息
export let getLoginInfo = (page,count,classes) =>http.get('/students/getstulist',{
    params:{
        page,
        count,
        class:classes
    }
})

// 增加学员信息
export let addStuInfo = params=>http.post("/students/addstu",params)

// 搜索学员信息
export let searchStu = (key,count)=>http.get("/students/searchstu",{
    params:{
        key,
        count
    }
})

// 删除学员信息
export let delStu = (sId)=>http.get("/students/delstu",{
    params:{
        sId
    }
})