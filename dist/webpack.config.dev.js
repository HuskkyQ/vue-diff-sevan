"use strict";

var _require = require('path'),
    resolve = _require.resolve;

module.exports = {
  entry: './src/index.js',
  output: {
    // 虚拟打包路径
    publicPath: 'wsf',
    // publicPath: resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    port: 3000,
    contentBase: 'public',
    open: true
  }
};