import httpInstance from '@/utils/http.js'

// 定义一个请求函数，测试请求
export function getCategory(){
    return httpInstance({
        url:'home/category/head'
    })
}