const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// http://www.mongoosejs.net/docs/api.html#create_create
const db = require("./module/db");
const app = express()
app.use(bodyParser.json())


// app.all("*", function (req, res, next) {
// 	//设置允许跨域的域名，*代表允许任意域名跨域
// 	res.header("Access-Control-Allow-Origin", "*");
// 	//允许的header类型
// 	res.header("Access-Control-Allow-Headers", "content-type");
// 	//跨域允许的请求方式 
// 	res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
// 	if (req.method.toLowerCase() == 'options') {
// 		res.send(200);  //让options尝试请求快速结束
// 	} else {
// 		next();
// // 	}
// })


// 数据库字段约束
var Schema = mongoose.Schema
var userSchema = new Schema({
	name: String,
	sex: Number,
	age: Number
})
var UserModel = mongoose.model('users', userSchema)







// 只要是路劲带 /secret 的请求  都会执行此方法
// app.all('/secret', function (req, res, next) {
//   console.log('Accessing the secret section ...')
//   next() // 将控制传递给下一个处理程序
// })

app.all("*", function (req, res, next) {
	//设置允许跨域的域名，*代表允许任意域名跨域
	res.header("Access-Control-Allow-Origin", "*");
	next()
})

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
	res.header("Access-Control-Allow-Origin", "*");
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


app.listen(80, function () {
	console.log('success')
})


// app.get('/list')

// https://juejin.cn/post/6865113400251432967