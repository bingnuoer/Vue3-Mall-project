// 管理用户数据相关
import { defineStore } from "pinia";
import { ref } from 'vue'
import { getLoginAPI } from '@/apis/user.js'
import { useCartStore } from './cartStore'

// 从后端获取数据 并进行赋值
export const useUserStore = defineStore('user', () => {
    // 1.定义管理用户数据的state
    const userInfo = ref({})
    const clearCart = useCartStore()

    // 2.定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }) => {
        // 发送登录请求
        const res = await getLoginAPI({ account, password })
        userInfo.value = res.result
    }

    // 退出登录时清空用户信息
    const clearUserInfo = () => {
        userInfo.value = {}
        // 清空购物车列表
        clearCart.clearCart()
    }

    // 3.以对象的格式把state和action return
    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
},
    {
        // 导入pinia持久化存储
        persist: true,
    }
)