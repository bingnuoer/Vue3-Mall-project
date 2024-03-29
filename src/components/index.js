// 把components中的所有组件都进行全局化注册
// 通过插件的方式
import ImageView from './ImageView/index.vue'
import XtxSku from './XtxSku/index.vue'

// 导出全局组件
// 在main.js中进行全局注册
export const componentPlugin = {
    // 注册全局组件
    install(app) {
        // app.component('组件名字','组件配置对象')
        app.component('XtxImageView', ImageView)
        app.component('XtxSku', XtxSku)
    }
}