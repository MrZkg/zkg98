module.exports = {

	devServer: {
		open:true,
		host:"127.0.0.1",
		// 跨域
		proxy: {
			// 只要axios请求中带有/api的url,就会触发代理机制
			'/api': {
				// 目标路径：target(我们要代理请求的地址)
				target: 'http://127.0.0.1',
				// 允许跨域
				changOrigin: true,
				// 重写路径 api代替了目标路径
				pathRewrite: {
					'^/api': ''
				}
			}
		},

	}
}