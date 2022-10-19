
const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/zkg98');
// { usemongoclient: true }

mongoose.connection.once("open", function () {
	console.log('---数据库连接成功---')
})
mongoose.connection.once("close", function () {
	console.log('---数据库连接已断开---')
})
// 断开数据库
// mongoose.disconnect()



// let data = async function (Model, params) {
// 	return new Promise(function (resolve, reject) {
// 		Model.create(params, function (err, results) {
// 			if (err) reject(err)
// 			else resolve(results)
// 		})
// 	})
// }

/*
增create
*/
module.exports.create = async (Model, params) => {
	return new Promise(function (resolve, reject) {
		Model.create(params, function (err, results) {
			if (err) reject(err)
			else resolve(results)
		})
	})
}
// module.exports.create = async (Model, params) => {
// 	return data(Model, params)
// }
/*
查find
*/
module.exports.find = async (Model, params) => {
	return new Promise(function (resolve, reject) {
		Model.find(params, function (err, results) {
			if (err) reject(err)
			else resolve(results)
		})
	})
}
/*
删除deleteOne
*/
module.exports.deleteOne = async (Model, params) => {
	return new Promise(function (resolve, reject) {
		Model.deleteOne(params, function (err, results) {
			if (err) reject(err)
			else resolve(results)
		})
	})
}

/*
修改updateOne
*/
module.exports.updateOne = async (Model, params) => {
	return new Promise(function (resolve, reject) {
		Model.findByIdAndUpdate(params.id, params, function (err, results) {
			if (err) reject(err)
			else resolve(results)
		})
	})
}







