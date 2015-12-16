var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    },
    // SASS
    {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
    },
    // CSS
    {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
    },
    // Images
    {
        test: /\.(png|jpg)$/, 
        loader: 'url-loader?limit=8192'
    },
    // JSON
    { 
        test: /\.json$/, 
        loader: 'json-loader'
    }]
  }
};
