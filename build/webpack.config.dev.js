const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base');

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = merge(baseConfig, {
	mode: 'development',
	devServer: {
		historyApiFallback: true,
		compress: true,
		port: 9000,
		open: true,
	},
	plugins: [
		new webpack.DefinePlugin({
      'process.env': {
				NODE_ENV: JSON.stringify('development')
			}
    }),
		new HtmlWebpackPlugin({
			title: 'Hello World app',
			template: resolve('public/index.html'),
			favicon: resolve('public/favicon.ico'),      //图标
			filename: 'index.html',       //指定输出路径和文件名
		}),
	]
})