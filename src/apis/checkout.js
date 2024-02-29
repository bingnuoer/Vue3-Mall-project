// 结算订单接口
import request from '@/utils/http'

export const getCheckInfoAPI = ()=> {
    return request({
        url:'/member/order/pre'
    })
}

// 提交订单
export const createOrderAPI = (data)=>{
    return request({
        url:'/member/order',
        method:'POST',
        data
    })
}