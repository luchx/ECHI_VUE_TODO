module.exports = {
	mode: 'production',
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		historyApiFallback: true,
		compress: true,
		port: 9000,
		open: true,
	},
}