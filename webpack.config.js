const path = require('path');
// const nodeExternals = require('webpack-node-externals');

module.exports = {

  devtool: 'source-map',

  entry: {
    server: './shared/shared.js'
  },

  // externals: [nodeExternals()],

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
    ]
  },

  output: {
    filename: '[name].js',
    libraryTarget: 'umd', /* So output can work in Node and in browser */
    path: path.resolve(__dirname, 'build')
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  target: 'node'

};
