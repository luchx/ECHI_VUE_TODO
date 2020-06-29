module.exports = {
	plugins: {
		autoprefixer: {},
		'postcss-pxtorem': {
			rootValue: 37.5, // 换算的基数
			baseDpr: 2,
		}
	}
}