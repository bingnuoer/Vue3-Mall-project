// 分类业务逻辑函数
import { ref, onMounted } from 'vue'
// 路由传参
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { getCategoryAPI } from '@/apis/category'

export function useCategory() {
    // 接收数据要看接口返回数据是什么类型
    const categoryData = ref({})
    // 创建一个route实例
    const route = useRoute()
    // id = route.params.id 表示to.params.id有值时传给id，没值时给id一个默认值route.params.id
    const getCategory = async (id = route.params.id) => {
        // 更新onBeforeRouteUpdate钩子函数中的路由参数Id
        const res = await getCategoryAPI(id)
        // console.log(res);
        categoryData.value = res.result
    }

    onMounted(() => {
        getCategory()
    })

    // 每次切换路由时，banner都请求一次，缓存浪费
    // 目标：路由参数变化时候，可以吧分类数据接口重新发送，这样避免了banner请求
    // onBeforeRouteUpdate携带对象参数to,会包含路由参数
    onBeforeRouteUpdate((to) => {
        console.log("路由变化了");
        // 存在问题：使用最新的路由参数请求最新的分类数据
        console.log(to);
        getCategory(to.params.id)
    })

    return {
        categoryData,
        route,
        getCategory
    }
}