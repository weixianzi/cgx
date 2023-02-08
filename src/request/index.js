import axios from "axios"
import { ElMessage } from "element-plus";

const http = axios.create({
   baseURL: '/api',
   timeout: 5000,
   withCredentials:true
 });

 // 添加请求拦截器
http.interceptors.request.use(config=>{
  // 在发送请求之前做些什么
  return config;
});

// 添加响应拦截器
http.interceptors.response.use(config=>{
  if(config.data.state){
    return config ;
  }else{
    ElMessage({
      message: config.data.msg,
      grouping: true,
      type: 'error',
    })
      return Promise.reject(config.data.msg)
  }
});

 export default http