const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    vendor: [
      'vue'
    ]
  },
  output: {
    path: path.join(__dirname, './dll'),
    filename: '[name].dll.js',
    library: '[name]_[hash]'
    // vendor.dll.js中暴露出的全局变量名。
    // 主要是给DllPlugin中的name使用，
    // 故这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
  },
  plugins: [
    // 清除之前的dll文件
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      path: path.join(__dirname, './dll', '[name]-manifest.json'),
      name: '[name]_[hash]'
    })
  ]
}
