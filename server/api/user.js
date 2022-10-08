const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const mongoose = require('mongoose')
const db = require("../module/db");

var Schema = mongoose.Schema
var userSchema = new Schema({
	name: String,
	sex: Number,
	age: Number
})
var UserModel = mongoose.model('users', userSchema)

app.post('/addUsers', function (req, res) {
	let params = req.body
	params.id = mongoose.Types.ObjectId();
	db.create(UserModel, params).then(() => {
		res.send({
			msg: '添加成功'
		})
	})

})
app.post('/findUsers', function (req, res) {
	let params = req.body
	db.find(UserModel, params).then((result) => {
		res.send({
			data: result,
			msg: '查询成功'
		})
	})

})
app.post('/deleteUser', function (req, res) {
	let params = req.body
	db.deleteOne(UserModel, params).then((result) => {
		res.send({
			data: result,
			msg: '删除成功'
		})
	})

})
app.post('/updateUser', function (req, res) {
	let params = req.body
	db.updateOne(UserModel, params).then((result) => {
		res.send({
			data: result,
			msg: '修改成功'
		})
	})

})