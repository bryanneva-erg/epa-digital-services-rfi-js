var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.prod');

var app = express();
var compiler = webpack(config);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;
// var publicPath = path.resolve(__dirname, 'public');

app.listen(port, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(isProduction, port)
  console.log('Listening at http://localhost:' + port);
});