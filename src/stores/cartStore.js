// 封装购物车模块
import { defineStore } from "pinia";
import { computed, ref } from "vue";


export const useCartStore = defineStore('cart', () => {
    // 1.定义state - cartList
    const cartList = ref([])
    // 2.定义action - addCart
    const addCart = (goods) => {
        // 添加购物车操作
        // 已添加过-count+1
        // 没有添加过 - 直接push
        // 思路：通过匹配传递过来的商品对象中的skuId能不能再cartList中找到，找到了就是添加过
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if (item) {
            // 找到了
            item.count++
        } else {
            // 没找到
            cartList.value.push(goods)
        }
    }

    // 3.删除购物车里数据
    const delCart = (skuId) => {
        // 思路：
        // 1、找到要删除项的下标值 - splice
        // 2、使用数组的过滤方法 - filter
        const idx = cartList.value.findIndex((item) => skuId === item.skuId)
        cartList.value.splice(idx, 1)
    }

    // 单选功能
    const singleCheck = (skuId, selected) => {
        // 通过skuId找到要修改的那一项 然后把它的selected修改为传过来的selected
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = selected
    }

    // 全选功能
    const allCheck = (selected) => {
        // 把cartList中的每一项的selected都设置为当前的全选框状态
        cartList.value.forEach((item)=>item.selected = selected)
    }
    // 是否全选
    // 获取数组中所有项-every方法
    const isAll = computed(()=> cartList.value.every((item) => item.selected))

    // 4.计算属性
    // 1）.总的数量 所有项的count之和
    // 数组的 reduce 方法是用于对数组中的每个元素进行累积计算的方法。它接受一个回调函数作为参数，并且可以传入一个初始值。
    // const sum = arr.reduce((累积值, 当前值-是一个对象) => 累积值 + 当前值, 初始累积值为 0);
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))

    // 2）总价 所有项的count*price之和
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

    return {
        cartList,
        allCount, //购物车 商品总数
        allPrice, //购物车 总价格
        isAll,  //是否全选
        addCart,
        delCart,
        singleCheck,
        allCheck // 全选功能
    }
},
    {
        // 导入pinia持久化存储
        persist: true,
    }
)