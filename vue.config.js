const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const IS_PRODUCTION = process.env.NODE_ENV === 'production' // 判断是否是生产环境
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
  publicPath: './',
  productionSourceMap: !IS_PRODUCTION, // 生产环境是否需要js的sourceMap
  // filenameHashing: false, // 打包出来的文件没有hash值。不会缓存（适用于测试环境）
  chainWebpack: (config) => {
    if (IS_PRODUCTION) { // 添加externals给全局
      config.plugin('html')
        .tap(args => {
          args[0].cdn = cdn
          return args
        })
        .end()
      config.externals(externals)
    }
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    // config
    //     .plugin('webpack-bundle-analyzer')
    //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)   // 生成可视化依赖树
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve('src'),
        '@mixins': resolve('src/mixins')
      }
    },
    optimization: {
      runtimeChunk: {
        name: entrypoint => `runtime~${entrypoint.name}`
      },
      splitChunks: { // 模块分包打包
        minChunks: 2,
        minSize: 20000,
        maxAsyncRequests: 20,
        maxInitialRequests: 30,
        name: false
      }
    },
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
  devServer: {
    open: true,
    host: '0.0.0.0', // 用于手机跟项目同一ip下可手机调试
    port: 8181,
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
