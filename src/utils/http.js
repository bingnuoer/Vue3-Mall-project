import axios from 'axios'
// 弹框
import { ElMessage } from 'element-plus'
// 解决样式覆盖
import 'element-plus/theme-chalk/el-message.css'

// 创建axios实例
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  // console.log("axios响应式拦截器");
  // 统一错误提示
  // console.log(e);
  ElMessage({
    type: 'warning',
    message: e.response.data.message
  })
  return Promise.reject(e)
})


export default httpInstance