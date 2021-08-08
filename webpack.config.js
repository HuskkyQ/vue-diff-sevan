const { resolve } = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
      // 虚拟打包路径
    publicPath: 'wsf',
    // publicPath: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    port: 8081,
    contentBase: 'public',
    open: true
  }
};