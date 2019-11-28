module.exports = {
	devServer: {
		proxy: {
			'/': {
				target: 'http://localhost:7499/flow',
				changeOrigin: true,
			},
		},
	},
	publicPath: './',
	outputDir: '../NearBack/public',
	lintOnSave: false,
};
