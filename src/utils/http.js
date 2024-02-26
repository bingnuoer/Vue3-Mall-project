import axios from 'axios'
// 弹框
import { ElMessage } from 'element-plus'

// token请求头
import { useUserStore } from '@/stores/user.js'

// 解决样式覆盖
import 'element-plus/theme-chalk/el-message.css'

// 创建axios实例
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  // 接口携带请求头
  // 1.从pinia获取token数据
  const userStore = useUserStore()
  // 2.按照后端的要求拼接token数据
  const token = userStore.userInfo.token
  if (token) {
    // 把token配置在请求头中 配置请求头固定写法
    config.headers.Authorization = `Bearer ${token}`
  }

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