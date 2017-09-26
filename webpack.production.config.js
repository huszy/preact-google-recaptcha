let webpack = require('webpack');

/**
 * This is the Webpack configuration file for production.
 */
module.exports = {
	entry: './src/index',

	output: {
		library: 'PreactGoogleRecaptcha',
		libraryTarget: 'umd',
		path: __dirname + '/dist/',
		filename: 'preact-google-recaptcha.js'
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		})
	],

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			}
		]
	},

	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [
			'node_modules'
		]
	}
};