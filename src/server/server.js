import axios from 'axios'
const ConfigBaseURL = 'http://localhost:9000/' //默认路径，这里也可以使用env来判断环境
//使用create方法创建axios实例
export const Service = axios.create({
  timeout: 5000, // 请求超时时间
  baseURL: ConfigBaseURL,
  method: 'get',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
// 添加请求拦截器
Service.interceptors.request.use(config => {
  return config
})
// 添加响应拦截器
Service.interceptors.response.use(response => {
  return response
}, error => {
  console.log('TCL: error', error)
  return Promise.reject(error)
})
