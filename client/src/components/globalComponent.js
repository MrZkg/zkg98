import Vue from 'vue' // 引入vue
function changeStr(str){
    return str.charAt(0).toUpperCase() + str.slice(1)
}
const requireComponent = require.context('.', false, /\.vue$/)
// 查找同级目录下以vue结尾的组件
requireComponent.keys().forEach(fileName => {
    const config = requireComponent(fileName)
    const componentName = changeStr(
        fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')   // ./child1.vue => child1
    )
    
    Vue.component(componentName, config.default || config) // 动态注册该目录下的所有.vue文件
})