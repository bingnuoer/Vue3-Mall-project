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

/**
 * @description: 获取二级分类列表数据-面包屑导航
 * @param {*} id 分类id 
 * @return {*}
 */

export const getCategoryFilterAPI = (id) => {
  return request({
    url: '/category/sub/filter',
    params: {
      id
    }
  })
}

/**
 * @description: 获取导航数据 获取二级分类商品列表数据
 * @data { 
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   } 
 * @return {*}
 */
export const getSubCategoryAPI = (data) => {
  return request({
    url: '/category/goods/temporary',
    method: 'POST',
    data
  })
}