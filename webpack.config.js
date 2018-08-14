const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
	mode: 'development',
	entry: './src/main.js',
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},
  resolve: {
    extensions: ['.js'],
    alias: {
    }
  },
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: ['babel-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.(css|less)$/,
				use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
			    'less-loader'
        ]
			},
			{
				test: /\.(png|jpe?g|svg|jpg|gif)$/,
				use: [
					'url-loader'
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					'url-loader'
				]
			},
			{
				test: /\.ico$/,
				use: [
					'file-loader'
				]
			}
		]
	},
	plugins: [
		// new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: 'FLOW_CHART_CONSTRUCTOR',
			filename: 'index.html',
      template: 'index.html'
		}),
		new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	devtool: 'eval-source-map',
	devServer: {
		contentBase: './dist',
		hot: true
	}
}