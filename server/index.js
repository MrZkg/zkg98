const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// http://www.mongoosejs.net/docs/api.html#create_create
const db = require("./module/db");
const app = express()
app.use(bodyParser.json())


const userRouter = require('./routes/users.js')
app.use('/users', userRouter)

// 只要是路劲带 /secret 的请求  都会执行此方法
// app.all('/secret', function (req, res, next) {
// 	console.log('Accessing the secret section ...')
// 	next() // 将控制传递给下一个处理程序
// })

app.all("*", function (req, res, next) {
	//设置允许跨域的域名，*代表允许任意域名跨域
	res.header("Access-Control-Allow-Origin", "*");
	next()
})

app.listen(80, function () {
	console.log('success')
})


// app.get('/list')

// https://juejin.cn/post/6865113400251432967