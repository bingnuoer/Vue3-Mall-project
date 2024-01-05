import { useIntersectionObserver } from '@vueuse/core'

// 插件文件夹
// 定义图片懒加载 插件
export const lazyPlugin = {
    // 定义一个install方法,必须是install(app实例)
    install(app) {
        // 定义全局指令-实现图片懒加载
        app.directive('img-lazy', {
            mounted(el, binding) {
                // el:指令绑定的那个元素：img图片
                // binding:binding.value 指令等于号后面绑定的表达式的值：图片url
                console.log(el, binding.value);
                // 使用图片懒加载
                const {stop} =useIntersectionObserver(
                    el,
                    ([{ isIntersecting }]) => {
                        console.log(isIntersecting)
                        if (isIntersecting) {
                            // 进入视口区域
                            // 再用指令 给图片src属性绑定url地址，显示图片
                            el.src = binding.value
                            // 在图片第一次加载出来后，不在进行懒加载请求，防止资源浪费
                            stop()
                        }
                    },
                )

            }
        })
    }
}