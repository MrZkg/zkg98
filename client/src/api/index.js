/**
 * api接口的统一出口
 */
import Vue from 'vue'
import axios from '@/config/http'; // 导入http中创建的axios实例

/**
 * /zkg98  是给nginx 做代理加的一层路由
 */
const findUsers = function (params) {
	return axios.post('/users/findUsers', params)
}
const addUsers = function (params) {
	return axios.post('/users/addUsers', params)
}
const deleteUser = function (params) {
	return axios.post('/users/deleteUser', params)
}
const updateUser = function (params) {
	return axios.post('/users/updateUser', params)
}


const api = {
	findUsers,
	addUsers,
	deleteUser,
	updateUser,
}

Vue.prototype.$api = api