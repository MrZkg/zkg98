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

// axios.interceptors.request.use(
// 	function (config) {
// 		return config
// 	},
// 	function (err) {
// 		Promise.reject(err)
// 	})
// // 响应的拦截
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


