var webpack = require('webpack');

var config = {
  context: __dirname + '/src',

  entry: {
    railsRanger: './rails-ranger.js',
  },

  output: {
    path: __dirname + '/dist',
    filename: 'rails-ranger.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: { presets: ['babel-preset-es2015'].map(require.resolve) }
      }
    ]
  }
}

module.exports = config;
