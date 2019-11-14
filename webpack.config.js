var webpack = require('webpack');

var config = {
  mode: 'production',

  context: __dirname + '/src',

  entry: {
    'rails-ranger':     './rails-ranger.js',
    'rails-ranger.min': './rails-ranger.js'
  },

  devtool: 'source-map',

  output: {
    path:          __dirname + '/dist',
    filename:      '[name].js',
    library:       '',
    libraryTarget: 'commonjs-module'
  },

  module: {
    rules: [
      {
        test:   /\.js$/,
        loader: 'babel-loader',
        query: { presets: ['babel-preset-es2015'].map(require.resolve) }
      }
    ]
  },

  optimization: {
    minimize: true,
  }
}

module.exports = config;
