/**
 * api接口的统一出口
 */
import Vue from 'vue'
import axios from '@/config/http'; // 导入http中创建的axios实例
// 用户信息
const userInfo = function () {
	return axios.get('/api/userInfo')
}
// 添加用户
const addUsers = function (params) {
	return axios.post('/api/addUsers', params)
}
const findUsers = function (params) {
	return axios.post('/api/findUsers', params)
}
const deleteUser = function (params) {
	return axios.post('/api/deleteUser', params)
}
const updateUser = function (params) {
	return axios.post('/api/updateUser', params)
}
const api = {
	userInfo,
	addUsers,
	findUsers,
	deleteUser,
	updateUser
}

Vue.prototype.$api = api