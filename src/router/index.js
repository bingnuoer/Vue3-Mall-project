// createRouter:创建router实例对象
// createWebHistory:创建history模式的路由（本项目使用这个）
import { createRouter, createWebHistory } from 'vue-router'
// 配置路由-导入一级网页
// 配置路由 就要创建 路由出口
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 给一级网页配置路由路径
    {
      path: '/',
      component: Layout,
      // 配置二级路由路径：一级网页下的二级路由
      // 并 在对应的一级网页页面配置二级路由出口
      children:[
        {
          path:'', //“/”进入home页面
          component:Home
        },
        {
          path:'category',
          component:Category
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})

export default router
