const path = require('path')
const webpack = require('webpack')
// 引入gzip压缩插件
const CompressionPlugin = require('compression-webpack-plugin')
// Webpack 包分析器
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const WebpackBar = require('webpackbar')
const isDev = process.env.NODE_ENV === 'development'
/**
 * 定位文件夹
 * @param {string} dir
 * @returns {string}
 */
const resolve = dir => path.join(__dirname, '.', dir)
module.exports = {
  // 服务配置
  devServer: {
    host: '0.0.0.0',
    port: 8080
  },
  // 配置选项...
  publicPath: './', // 部署应用包时的根路径
  assetsDir: './',
  runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本。
  productionSourceMap: false, // 关闭生产环境source map，加速生产环境构建，并减少包体积
  lintOnSave: true, // 保存时 lint 代码
  // CSS配置
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    extract: !isDev,
    requireModuleExtension: true,
    // 是否开启 CSS source map？
    sourceMap: false,
    // 为预处理器的 loader 传递自定义选项。
    loaderOptions: {
      sass: {

      }
    }
  },
  // webpack基础配置
  configureWebpack: config => {
    // 配置polyfill，默认不启用，对性能有影响
    // config.entry.app = ['babel-polyfill', './src/main.js']
    if (process.env.IS_OPEN_GZIP === 'open' && !isDev) {
      config.plugins.push(
        new CompressionPlugin({ // gzip压缩配置
          test: /\.js$|\.html$|\.css/, // 匹配文件名
          threshold: 10240, // 对超过10kb的数据进行压缩
          deleteOriginalAssets: false // 是否删除原文件
        })
      )
    }
    if (!isDev) {
      // 生成代码分析报告，帮助提升代码质量和网站性能
      // if (process.env.npm_config_report) {
      //   // config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin).end()
      //   config.plugins.push(new BundleAnalyzerPlugin())
      // }
      config.plugins.push(
        // moment体积优化 优化moment 去掉国际化内容
        new webpack.ContextReplacementPlugin(
          /moment[/\\]locale$/,
          /zh-cn/
        )
      )
    }
    // 插件
    config.plugins.push(
      // 控制台显示打包时间
      new WebpackBar({
        name: process.env.VUE_APP_TITLE
      })
    )
  },
  // 修改webpack相关配置
  chainWebpack: config => {
    // 配置文件alias
    config.resolve.alias
      .set('@apis', resolve('src/apis'))
      .set('@assets', resolve('src/assets'))
      .set('@config', resolve('src/config'))
      .set('@const', resolve('src/const'))
      .set('@components', resolve('src/components'))
      .set('@layout', resolve('src/views/layout'))
      .set('@utils', resolve('src/utils'))
      .set('@scripts', resolve('src/scripts'))
      .set('@styles', resolve('src/styles'))
      .set('@views', resolve('src/views'))

    if (!isDev) {
      // 去除多余提示
      config.performance.set('hints', false)
      config.devtool('none')
      // 代码分割
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'vendors-chunk',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          },
          utils: {
            name: 'chunk-utils',
            test: resolve('src/assets/scripts'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
    }
    config.optimization.minimizer('terser').tap((args) => {
      // 去除生产环境console
      // eslint-disable-next-line camelcase
      args[0].terserOptions.compress.drop_console = true
      return args
    })
    // 去除mini-css warning提示
    // config.when(process.env.NODE_ENV !== 'development', config => {
    //   config.plugin('extract-css').tap(options => {
    //     options[0].ignoreOrder = true
    //     return options
    //   })
    // })
    config.output.filename('[name].[hash].js').end()
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/svgs'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/svgs'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
