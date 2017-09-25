let path = require('path');
let webpack = require('webpack');

module.exports = {
	devtool: 'source-map',
	entry: [
		'react-hot-loader/patch',
		'webpack-hot-middleware/client?reload=true',
		'./src/index'
	],
	output: {
    path: __dirname+ '/public',
    publicPath: '/public/',
    filename: 'bundle.js'
  },
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	module: { 
		loaders: [
			{test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel-loader']},
			{test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
			{test: /(\.css)$/, loaders: ['style-loader', 'css-loader']},
			{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"},
			{test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
			{test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
			{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream"},
			{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml"},
			{test: /\.(png)$/, loader: 'url-loader?limit=100000'}
		]
	}
};

//export default config;