import axios from "axios"
import { ElMessage } from "element-plus";
import router from "@/router/index.js"

const http = axios.create({
   baseURL: '/api',
   timeout: 5000,
   withCredentials:true
 });

 // 添加请求拦截器
http.interceptors.request.use(config=>{
  let token = sessionStorage.getItem("lf-token")
  config.headers.authorization = token
  return config;
});

// 添加响应拦截器
http.interceptors.response.use(config=>{
  
  if(config.data.state||config.config.url==="/order/query_order_status"){
    return config ;
  }else{
    ElMessage({
      message: config.data.msg,
      grouping: true,
      type: 'error',
    })
    if(config.data.code==="10022"||config.data.code==="1004"){
      sessionStorage.removeItem("lf-token")
      router.push("/login")
      location.reload()
    }
      return Promise.reject(config.data.msg)
  }
});

 export default http