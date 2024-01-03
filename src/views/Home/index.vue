<script setup>
import HomeCategory from './components/HomeCategory.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeNew from './components/HomeNew.vue'
import HomeHot from './components/HomeHot.vue'
import HomeProduct from './components/HomeProduct.vue'
import HomePanel from './components/HomePanel.vue'
</script>

<template>
    <div class="container">
        <HomeCategory />
        <HomeBanner />
    </div>
    <HomeNew />
    <HomeHot />
    <HomeProduct />

    <!-- 面板部分 -->
    <!-- 使用插槽-模板复用 -->
    <!-- 使用标题和副标题 -->
    <HomePanel title="新鲜好物" subTitle="新鲜好物 好多内容">
        <!-- 使用插槽 -->
        <div>我是新鲜好物的内容区域</div>
    </HomePanel>
    <HomePanel title="人气推荐" subTitle="人气推荐 好多内容">
        <div>我是人气推荐的内容区域</div>
    </HomePanel>
</template>