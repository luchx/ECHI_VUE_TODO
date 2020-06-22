module.exports = {
	plugins: {
		autoprefixer: {},
		'postcss-pxtorem': {
			rootValue: 37.5, // 换算的基数
			// selectorBlackList: ['weui', 'mu'], // 忽略转换正则匹配项
			propList: ['*'],
		}
	}
}