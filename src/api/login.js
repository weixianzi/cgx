import http from "@/request/index.js"

// 常规登入
export let commonLogin = (username,password) => http.post("/users/login",{
    username,
    password
 })

//  获取验证码
 export let getQrCode = ()=>http.get("/users/getCaptcha?v=next")

//  校验验证码
 export let verifyVcode = (captcha) =>http.get("/users/verifyCaptcha",{
    params:{
        captcha
    }
 })

//  获取短信验证码
 export let getPhoneCode = (phoneNumber)=>http.post("/sms/send",{
    phoneNumber
 })

//  验证短信验证码登入
export let verifyCode = (code) => http.post("/users/login?type=sms",{
    code
})

// 获取登陆日志
export let getLoginDate = ()=>http.get("/getloginlog")