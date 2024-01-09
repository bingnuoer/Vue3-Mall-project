// 轮播图业务逻辑函数
import { ref, onMounted } from 'vue'
import { getBannerAPI } from '@/apis/home'

export function useBanner() {
    const bannerList = ref([])

    const getBanner = async () => {
        const res = await getBannerAPI({
            distributionSite: '2'
        })
        console.log(res)
        bannerList.value = res.result
    }

    onMounted(() => getBanner())

    // 以对象的形式return数据/方法
    return {
        bannerList,
        getBanner
    }
}
