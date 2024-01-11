<script setup>
// 发送请求，渲染数据
// 24小时热榜
import { fetchHotGoodsAPI } from '@/apis/detail.js'
import { useRoute } from 'vue-router'
import { ref, onMounted, computed } from 'vue'

// props传值
const props = defineProps({
  hotType: {
    // 1代表24小时热销榜 2代表周热销榜 3代表总热销榜 可以使用hotType去适配title和数据列表
    type: Number,
    default: 1 //默认值1
  }
})

// 适配title 1：24小时热榜  2：周热榜
const TYPEMAP = {
  1: '24小时热榜',
  2: '周热榜'
}
// []取值
const title = computed(() => TYPEMAP[props.hotType])

// 调用接口渲染模板
const route = useRoute()
const hotList = ref([])
const getHotList = async () => {
  const res = await fetchHotGoodsAPI({
    id: route.params.id,
    type: props.hotType, //取不同值
    // limit默认是传3，这块就不写参数
  })
  hotList.value = res.result
}

onMounted(() => getHotList())

</script>


<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <!-- 商品区块 -->
    <RouterLink to="/" class="goods-item" v-for="item in hotList" :key="item.id">
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
</template>


<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

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
}
</style>