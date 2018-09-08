require('babel-polyfill');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: ['babel-polyfill', './src/index.js'],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.scss$/,
				use: [
					{loader: 'style-loader'},
					{loader: 'css-loader'},
					{loader: 'sass-loader'}
				]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: {loader: 'file-loader'}
			}
		]
	},
	resolve: {
		alias: {
			'scss': path.resolve(__dirname, './src/scss')
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Fn Store Spy',
			template: './src/index.html'
		})
	]
};