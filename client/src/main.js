import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/styles/index.scss'



// 全局注册组件
// import './components/globalComponent'

import axios from './config/http'; // 导入http中创建的axios实例
Vue.prototype.$axios = axios
import './api/index.js' // 引入api接口 $api



import ELEMENT from 'element-ui'
require('element-ui/lib/theme-chalk/index.css')
Vue.use(ELEMENT, {
  size: 'medium'
})



Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
