// 支付相关接口
import request from '@/utils/http'
// 获取支付订单详情
export const getOrderAPI = (id) => {
    return request({
        url:`/member/order/${id}`
    })
}