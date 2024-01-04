import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 引入初始化的样式文件
import "@/styles/common.scss"
// 定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// 定义全局指令-实现图片懒加载
app.directive('img-lazy', {
    mounted(el, binding) {
        // el:指令绑定的那个元素：img图片
        // binding:binding.value 指令等于号后面绑定的表达式的值：图片url
        console.log(el, binding.value);
        // 使用图片懒加载
        useIntersectionObserver(
            el,
            ([{ isIntersecting }]) => {
                console.log(isIntersecting)
                if (isIntersecting) {
                    // 进入视口区域
                    // 再用指令 给图片src属性绑定url地址，显示图片
                    el.src = binding.value
                }
            },
        )

    }
})
