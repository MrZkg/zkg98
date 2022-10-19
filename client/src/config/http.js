import axios from 'axios'
import Vue from 'vue'
import router from '../router'


// 创建axios实例
// var instance = axios.create({
// 	timeout: 1000 * 12
// })
// 设置post请求头
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截
// instance.interceptors.request.use(
//   config => {
//     // config.url
//     // 每次发送请求之前判断vuex中是否存在token        
//     // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
//     // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
//     const token = store.state.token
//     token && (config.headers.Authorization = token)
//     return config
//   },
//   error => {
//     return Promise.error(error)
//   }
// )
// 响应的拦截
// instance.interceptors.response.use(
//   // 请求成功
//   res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
//   // 请求失败
//   error => {
//     const {
//       response
//     } = error
//     if (response) {
//       // 请求已发出，但是不在2xx的范围 
//       errorHandle(response.status, response.data.message);
//       return Promise.reject(response); //response.data
//     } else {
//       // 处理断网的情况
//       // eg:请求超时或断网时，更新state的network状态
//       // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
//       // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
//       if (!window.navigator.onLine) {
//         store.commit('setNetwork', false);
//       } else {
//         return Promise.reject(error);
//       }

//     }
//   }

// )

// request拦截器
const NODE_ENV = process.env.NODE_ENV
// 走nginx代理时要加 /zkg98
const BASE_API = NODE_ENV === 'development' ? '/api/zkg98' : '/zkg98' //http://120.46.129.54:80/   
// /api  是本地开发的代理依据    /zkg98 是服务器nginx的代理
axios.interceptors.request.use((config) => {
	// 需要在请求发出前做的全局处理逻辑可以添加在这里
	config.url = BASE_API + config.url;
	return config;
}, (error) => {
	// 可以在这里统一处理请求错误
	Promise.reject(error);
});
// // 响应的拦截
console.log(1111111111, process.env.NODE_ENV)
// const 
axios.interceptors.response.use(
	function (res) {
		// console.log(2222,res)
		return res.data
	},
	// function (err) {
	// 	Promise.reject(err)
	// }

)
export default axios;


