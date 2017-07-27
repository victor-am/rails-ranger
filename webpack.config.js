var webpack = require('webpack');

var config = {
  context: __dirname + '/src',

  entry: {
    'rails-ranger':     './rails-ranger.js',
    'rails-ranger.min': './rails-ranger.js'
  },

  devtool: 'source-map',

  output: {
    path: __dirname + '/dist',
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: { presets: ['babel-preset-es2015'].map(require.resolve) }
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ]
}

module.exports = config;
