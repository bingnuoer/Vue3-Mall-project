// createRouter:创建router实例对象
// createWebHistory:创建history模式的路由（本项目使用这个）
import { createRouter, createWebHistory } from 'vue-router'
// 配置路由-导入一级网页
// 配置路由 就要创建 路由出口
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
// 配置路由-导入二级分类页
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'
import Checkout from '@/views/Checkout/index.vue'
import Pay from '@/views/Pay/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 给一级网页配置路由路径
    {
      // 相当于给这个网页配跳转路由地址-在配置path路由路径的网页点击跳转，就会跳转到component配置的页面

      // 网页跳转路由地址
      path: '/',
      // 对应的组件
      component: Layout,
      // 配置二级路由路径：一级网页下的二级路由
      // 并 在对应的一级网页页面配置二级路由出口
      children: [
        {
          path: '', //“/”进入home页面
          component: Home
        },
        // 分类页
        {
          // 动态路由，参数id
          path: 'category/:id',
          name: 'category',
          component: Category
        },
        // 二级分类页
        {
          // 动态路由，参数id
          path: 'category/sub/:id',
          name: 'subcategory',
          component: SubCategory
        },
        // 二级详情页-新鲜好物点击商品会跳转到这个路由对应的页面（商品详情页）下
        {
          // 动态路由，参数id
          path: 'detail/:id',
          name: 'detail',
          component: Detail
        },
        {
          path: '/cartlist',
          component: CartList
        },
        {
          path: '/checkout',
          component: Checkout
        },
        {
          path: '/pay',
          component: Pay
        }
      ]
    },
    // 登录页路由
    {
      path: '/login',
      component: Login
    }
  ],
  // 路由滚动行为定制：切换路由时使页面自动定位到顶部
  scrollBehavior() {
    return {
      top: 0
    }
  }

})

export default router
