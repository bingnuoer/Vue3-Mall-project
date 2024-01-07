// request就是创建的axios实例httpInstance，可以随意起名字
import request from '@/utils/http'

export function getCategoryAPI(id) {
    return request({
        url: '/category',
        // 待会路由传参
        params: {
            id
        }
    })
}