// 封装倒计时逻辑函数
import dayjs from 'dayjs'
import { computed, onUnmounted, ref } from 'vue'
export const useCountDown = () => {
    // 1.响应式的数据
    let timer = null
    const time = ref(0) //倒计时开始时的初始数据
    // 格式化时间 为 xx分xx秒
    // 调用格式化时间插件dayjs
    const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
    // 2.开启倒计时的函数
    const start = (currentTime) => {
        // 开始倒计时的逻辑
        time.value = currentTime
        // 核心逻辑的编写：每隔1s就减一
        // 定时器
        timer = setInterval(() => {
            time.value--
        }, 1000)
    }
    // 组件销毁时清除定时器
    onUnmounted(() => {
        timer && clearInterval(timer)
    })
    return {
        time,
        formatTime,
        start
    }
}