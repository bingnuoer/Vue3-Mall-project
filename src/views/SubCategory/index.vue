<script setup>
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category.js'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import GoodsItem from '@/views/Home/components/GoodsItem.vue';

// 获取二级分类列表数据-面包屑导航
// 创建路由实例
const route = useRoute()

const categoryData = ref([])
const getCategoryData = async () => {
    // useRoute路由传参-接口配置的params参数
    const res = await getCategoryFilterAPI(route.params.id)
    categoryData.value = res.result
    console.log(categoryData);
}

onMounted(() => getCategoryData())

// 获取二级分类商品列表数据
const goodList = ref([])
const reqData = ref({
    categoryId: route.params.id,
    page: 1,
    pageSize: 20,
    // 面包屑导航数据
    sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
})
const getGoodList = async () => {
    const res = await getSubCategoryAPI(reqData.value)
    console.log(res);
    goodList.value = res.result.items
}

onMounted(() => getGoodList())

// 点击tab卡片式导航，实现数据切换
const tabChange = () => {
    console.log("tab切换了", reqData.value.sortField);
    // 请求之前每次把导航页置为1
    reqData.value.page = 1
    // 重新发起请求
    getGoodList()

}

const disabled = ref(false) //没有禁止无限加载
// 无限滚动-加载更多
const load = async () => {
    console.log("加载更多数据咯");
    // 页数+1
    reqData.value.page++
    // 发送请求获取下一页数据
    const res = await getSubCategoryAPI(reqData.value)
    // 最新goodList数据=老数据+新数据 拼接:展开运算符
    goodList.value = [...goodList.value, ...res.result.items]

    // 加载完毕,结束监听
    if (res.result.items.length === 0) {
        disabled.value = true //结束监听
    }

}


</script>

<template>
    <div class="container ">
        <!-- 面包屑 -->
        <div class="bread-container">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <!-- 跳转路径 -->
                <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">{{ categoryData.parentName }}
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="sub-container">
            <!-- element-ui组件 -->
            <!-- 数据双向绑定：获取当前点击的卡片式导航的数据 -->
            <!-- @tab-change="tabChange" 监听卡片导航的改变 -->
            <!-- name="publishTim"的属性都是根据接口文档命名 -->
            <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
                <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
                <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
                <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
            </el-tabs>
            <!-- v-infinite-scroll 无限滚动 -->
            <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
                <!-- 商品列表-封装好的模块-->
                <!-- goods是封装的模块导出的数据名 -->
                <GoodsItem v-for="item in goodList" :goods="item" :key="item.id" />
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>
.bread-container {
    padding: 25px 0;
    color: #666;
}

.sub-container {
    padding: 20px 10px;
    background-color: #fff;

    .body {
        display: flex;
        flex-wrap: wrap;
        padding: 0 10px;
    }

    .goods-item {
        display: block;
        width: 220px;
        margin-right: 20px;
        padding: 20px 30px;
        text-align: center;

        img {
            width: 160px;
            height: 160px;
        }

        p {
            padding-top: 10px;
        }

        .name {
            font-size: 16px;
        }

        .desc {
            color: #999;
            height: 29px;
        }

        .price {
            color: $priceColor;
            font-size: 20px;
        }
    }

    .pagination-container {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }


}
</style>