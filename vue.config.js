const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

const IS_PRODUCTION = process.env.NODE_ENV === 'production' // 判断是否是生产环境
const webpack = require('webpack')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const cdn = [
  'https://cdn.bootcss.com/axios/0.19.0/axios.min.js'
]
const externals = {
  'axios': 'axios'
}
module.exports = {
  publicPath: '/vue1/',
  chainWebpack: (config) => {
    config.resolve
      .extensions
      .merge(['.js', '.vue']) // 文件拓展名
      .end()
      .alias
      .set('@', resolve('src')) // 路径别名
      .set('@mixins', resolve('src/mixins'))
    if (IS_PRODUCTION) { // 添加externals给全局
      config.plugin('html')
        .tap(args => {
          args[0].cdn = cdn
          return args
        })
        .end()
      config.externals(externals)
    }
    // config
    //     .plugin('webpack-bundle-analyzer')
    //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)   // 生成可视化依赖树
  },
  configureWebpack: {
    plugins: [
      new webpack.DllReferencePlugin({ // 配置DllPlugin
        context: process.cwd(),
        manifest: require('./dll/vendor-manifest.json')
      }),
      // 将 dll 注入到 生成的 html 模板中
      new AddAssetHtmlPlugin({
        // dll文件位置
        filepath: path.resolve(__dirname, './dll/*.js'),
        // dll 引用路径
        publicPath: './js',
        // dll最终输出的目录
        outputPath: './js'
      })
    ]
  },
  productionSourceMap: !IS_PRODUCTION, // 生产环境是否需要js的sourceMap
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://www.baidu.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
    extract: true,

    // 是否开启 CSS source map？
    sourceMap: false,

    // 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {
      // sass: {
      // // data: fs.readFileSync('src/assets/theme/index.scss', 'utf-8')
      //     data:`@import "@/assets/scss/common.scss";`
      // },
      sass: {
        prependData: `
            @import "@/assets/scss/common.scss";
          `
      }
    }
  }
}
