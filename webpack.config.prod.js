var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  // entry: {
  //   javascript: "./src/index.js",
  //   html: "./src/index.html",
  // },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
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
    },
    {
      test: /\.html$/,
      loader: "file?name=[name].[ext]",
    }]
  }
};
