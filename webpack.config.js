const currentTask = process.env.npm_lifecycle_event
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
	entry: path.resolve(__dirname, 'src', 'main.js'),
	output: {
		path: path.resolve(__dirname, 'docs'),
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
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource'
			}
		]
	}
	,
	plugins: [
		new HtmlWebpackPlugin({ template: './src/index.html', filename: 'index.html' })
	],
	devServer: {
		before: (app, server) => server._watch('./src/**/*.html'),
		contentBase: path.join(__dirname, 'src'),
		port: 8080,
		hot: true,
		watchContentBase: true
	}

}

if (currentTask === 'build') {
	config.mode = 'production';
	config.module.rules[1].use[0] = (MiniCssExtractPlugin.loader);
	config.plugins.push(new MiniCssExtractPlugin({ filename: 'styles.[hash].css' }), new CopyPlugin({
		patterns: [
			{ from: "src/img", to: "img" }
		]
	}));
	config.output.clean = true;

}

module.exports = config;