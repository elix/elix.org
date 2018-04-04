const path = require('path');
// const nodeExternals = require('webpack-node-externals');

module.exports = {

  mode: 'development',

  devtool: 'source-map',

  entry: {
    server: './shared/shared.js'
  },

  // externals: [nodeExternals()],

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
        query: {
          plugins: [
            ['transform-react-jsx', {
              'pragma':'h'
            }]
          ],
          presets: [
            ['env', {
              targets: {
                browsers: [
                  'last 2 Chrome versions',
                  'last 2 Safari versions',
                  'last 2 Firefox versions',
                  'last 2 Edge versions'
                ]
              }
            }]
          ]
        }
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
