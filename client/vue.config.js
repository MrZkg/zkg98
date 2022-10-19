module.exports = {
	// publicPath: './', // build 后本地可直接打开
	// configureWebpack: {
	//   // name: 'zkg98', // 自定义标题
	// },
	chainWebpack: config => {
		config.plugin('html').tap(args => {
			args[0].title = 'zkg98中心';
			return args;
		})
	},
	devServer: {
		open: true,
		host: "127.0.0.1",
		// 跨域
		proxy: {
			// 只要axios请求中带有/api的url,就会触发代理机制
			'/api': {
				// 目标路径：target(我们要代理请求的地址)
				// target: 'http://127.0.0.1',
				// target: 'http://120.46.129.54:8080/',
				target: 'https://zkg98.com/',

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