import request from '@/utils/http.js'
// 封装 会员中心-订单相关 接口

/*
params: {
	orderState:0, //tab切换
  page:1, //页数
  pageSize:2 //每页条数
}
*/


export const getUserOrder = (params) => {
    return request({
      url:'/member/order',
      method:'GET',
      params
    })
  }