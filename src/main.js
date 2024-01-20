// 入口文件
// 只写初始化
import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'

// 引入初始化的样式文件
import "@/styles/common.scss"

// 引入懒加载指令插件并注册
import { lazyPlugin } from '@/directives/index.js'

// 引入全局组件
import { componentPlugin } from '@/components/index.js'

// 导入pinia持久化存储插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 定义懒加载插件
const app = createApp(App)
const pinia = createPinia()

// 注册持久化插件
pinia.use(piniaPluginPersistedstate)

app.use(pinia)

app.use(router)
// 导入图片懒加载插件
app.use(lazyPlugin)

// 导入全局组件
app.use(componentPlugin)

app.mount('#app')




