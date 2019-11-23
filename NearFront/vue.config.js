module.exports = {
	devServer: {
		proxy: {
			'/': {
				target: 'http://172.16.41.21:7499/flow',
				changeOrigin: true,
			},
		},
	},
	publicPath: './',
	outputDir: '../NearBack/public',
	lintOnSave: false,
};
