var webpack = require('webpack');
var path = require('path');

var env = process.env.NODE_ENV;

var config = {
  output: {
    library: 'EthicalJobsRedux',
    libraryTarget: 'umd'
  },
  module: {
    loaders: []
  },
  resolve: {
    modulesDirectories: ['src', 'node_modules'],
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
};

module.exports = config;
