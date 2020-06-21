const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const baseConfig = require('./webpack.config.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = merge(baseConfig, {
	mode: 'production',
	output: {
		filename: "[name].[hash].js",
		path: resolve('dist/js'),
	},
	plugins: [
		new webpack.DefinePlugin({
      'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
    }),
		new MiniCssExtractPlugin({
			filename: 'style.css'
		}),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'Hello World app',
			template: resolve('public/index.html'),
			favicon: resolve('public/favicon.ico'),      //图标
			filename: 'index.html',       //指定输出路径和文件名
		}),
	]
})