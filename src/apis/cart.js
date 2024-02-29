// 封装购物车相关接口
import request from '@/utils/http'
// 加入购物车
export const insertCartAPI = ({ skuId, count }) => {
    return request({
        url: '/member/cart',
        method: 'POST',
        data: {
            skuId,
            count
        }
    })
}

// 获取最新的购物车列表
export const FindNewCartListAPI = () => {
    return request({
        url: '/member/cart'
    })
}

// 删除购物车列表里的商品
export const delCartAPI = (ids) => {
    return request({
        url: '/member/cart',
        method: 'DELETE',
        data: {
            ids //商品sku的id集合 数组
        }
    })
}

// 合并购物车
export const mergeCartAPI = (data) => {
    return request({
        url: '/member/cart/merge',
        method: 'POST',
        data // data是由skuId、selected、count这三个参数组成
    })
}