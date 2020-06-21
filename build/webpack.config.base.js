const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = {
	devtool: 'inline-source-map',
	entry: resolve('src/main.ts'),
	resolve: {
		// 将 `.ts` 添加为一个可解析的扩展名。
		extensions: ['.ts', '.js', '.vue'],
		alias: {
			'@': resolve('src'),
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				exclude: /node_modules/,
				loader: 'vue-loader',
				include: resolve('src'),
			},
			{
				test: /\.(ts|tsx)$/,
				loader: 'ts-loader',
				options: { appendTsSuffixTo: [/\.vue$/] }
			},
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude: file => (
					/node_modules/.test(file) &&
					!/\.vue\.js/.test(file)
				),
			},
			{
				test: /\.css$/,
				use: [
					process.env.NODE_ENV !== 'production'
						? 'vue-style-loader'
						: MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: { importLoaders: 1 }
					},
					'postcss-loader'
				]
			},
			{
				test: /\.less$/,
				use: [
					'vue-style-loader',
					'css-loader',
					'less-loader',
					'postcss-loader'
				]
			},
			{
				test: /\.(gif|png|jpg|jpeg|svg)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 1024,
						name: '[name]-[hash].[ext]'
					}
				}]
			},
			{
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]'
        }
      }
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new webpack.HashedModuleIdsPlugin(),
		new webpack.ProgressPlugin(),
	]
}