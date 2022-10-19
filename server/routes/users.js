const express = require('express')
const mongoose = require('mongoose')
const db = require("../module/db");

const router = express.Router()


// 数据库字段约束
var Schema = mongoose.Schema
var userSchema = new Schema({
	name: String,
	sex: Number,
	age: Number
})
var UserModel = mongoose.model('users', userSchema)


router.post('/findUsers', function (req, res, next) {
	// res.header("Access-Control-Allow-Origin", "*");
	let params = req.body
	db.find(UserModel, params).then((result) => {
		res.send({
			data: result,
			msg: '查询成功'
		})
	})
})
router.post('/addUsers', function (req, res) {
	let params = req.body
	params.id = mongoose.Types.ObjectId();
	db.create(UserModel, params).then(() => {
		res.send({
			msg: '添加成功'
		})
	})
})
router.post('/deleteUser', function (req, res) {
	let params = req.body
	db.deleteOne(UserModel, params).then((result) => {
		res.send({
			data: result,
			msg: '删除成功'
		})
	})

})
router.post('/updateUser', function (req, res) {
	let params = req.body
	db.updateOne(UserModel, params).then((result) => {
		res.send({
			data: result,
			msg: '修改成功'
		})
	})

})


module.exports = router