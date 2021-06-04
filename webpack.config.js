const currentTask = process.env.npm_lifecycle_event
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const config = {
	entry: path.resolve(__dirname, 'src', 'main.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[hash].js',
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					"style-loader", //comment for builds
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader",
				],
			}
		]
	}
	,
	plugins: [
		new HtmlWebpackPlugin({ template: './src/index.html', filename: 'index.html' })
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 8080,
		hot: true,
		watchContentBase: true
	}

}

if (currentTask === 'build') {
	config.mode = 'production';
	config.module.rules[1].use[0] = (MiniCssExtractPlugin.loader);
	config.plugins.push(new MiniCssExtractPlugin({ filename: 'styles.[hash].css' }));
	config.output.clean = true;

}

module.exports = config;