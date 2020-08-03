const os = require('os')
const path = require('path')
const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CDNPlugins = require('cdn-plugins-jousenzhou')
const Timestamp = new Date().getTime()
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const IS_PROD = ['production', 'prepro'].includes(process.env.NODE_ENV)

console.log('IS_PROD', IS_PROD, '当前环境 NODE_ENV', process.env.NODE_ENV)
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
// 获取本机ip
const myHost = (() => {
  const interfaces = os.networkInterfaces()
  for (const devName in interfaces) {
    const iface = interfaces[devName]
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
})()
module.exports = {
  // 确保打包后路径无误
  publicPath: './',
  outputDir: 'rbp', // 打包名称
  lintOnSave: false, // 是否在保存的时候检查
  filenameHashing: true,
  // productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.ts'
    }
  },
  configureWebpack: config => {
    const plugins = []
    plugins.push(new WebpackBar({ profile: true }))
    if (IS_PROD) {
      plugins.push(
        new webpack.DllReferencePlugin({
          manifest: require('./public/vendor/vendor-manifest.json')
        }),
        // dll 预先编译资源模块 一般放固定的 如 vue 等
        new AddAssetHtmlPlugin({
        // dll文件位置
          filepath: path.resolve(__dirname, './public/vendor/*.js'),
          // dll 引用路径
          publicPath: '/vendor',
          // dll最终输出的目录
          outputPath: './vendor'
        })
        // new CompressionWebpackPlugin({
        //   filename: '[path].gz[query]',
        //   algorithm: 'gzip',
        //   test: productionGzipExtensions,
        //   threshold: 10240,
        //   minRatio: 0.8
        // }),
        // new CDNPlugins({
        //   devMode: true,
        //   css: [],
        //   js: [
        //     {
        //       externals: { 'vue': 'Vue' },
        //       path: ['https://image3.myjuniu.com/vue.min.js', 'https://data-wp.myjuniu.com/cdn/js/vue.min.js']
        //     },
        //     {
        //       externals: { 'vue-router': 'VueRouter' },
        //       path: ['https://image3.myjuniu.com/vue-router.min.js', 'https://data-wp.myjuniu.com/cdn/js/vue-router.min.js']
        //     },
        //     {
        //       externals: { 'vuex': 'Vuex' },
        //       path: ['https://image3.myjuniu.com/vuex.min.js', 'https://data-wp.myjuniu.com/cdn/js/vuex.min.js']
        //     },
        //     {
        //       externals: { 'element-ui': 'ELEMENT' },
        //       path: ['https://image3.myjuniu.com/elementUi.js', 'https://data-wp.myjuniu.com/cdn/js/elementUi.js']
        //     },
        //     {
        //       externals: { 'axios': 'axios' },
        //       path: ['https://image3.myjuniu.com/axios.min.js', 'https://data-wp.myjuniu.com/cdn/js/axios.min.js']
        //     },
        //     {
        //       externals: { 'devextreme': 'devextreme' },
        //       path: ['https://image3.myjuniu.com/devextreme@19.2.7_.js']
        //     }
        //   ]
        // })
      )

      // config.optimization = {
      //   runtimeChunk: 'single',
      //   splitChunks: {
      //     chunks: 'all',
      //     cacheGroups: {
      //       libs: {
      //         name: 'chunk-libs',
      //         test: /[\\/]node_modules[\\/]/,
      //         priority: 10,
      //         chunks: 'initial' // 分别打包
      //       },
      //       elementUI: {
      //         name: 'chunk-elementUI',
      //         priority: 20,
      //         test: /[\\/]node_modules[\\/]_?element-ui(.*)/
      //       },
      //       commons: {
      //         name: 'chunk-commons',
      //         test: resolve('src/components'),
      //         minChunks: 3, //  此参数代表包被引用几次以上之后，才会进行代码分割。
      //         priority: 5, // 缓存的优先级 当一个模块同时满足要求时 参数越大优先级越高
      //         reuseExistingChunk: true // 设置为 true 之后 表示 如果被打包过了 之后打包会忽略
      //       }
      //     }
      //   }
      // }
    }
    config.plugins = [...config.plugins, ...plugins]
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))

    if (process.env.NODE_ENV === 'production') {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
    // if (IS_PROD) {
    // config.module
    //   .rule('images')
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({
    //     mozjpeg: { progressive: true, quality: 65 },
    //     optipng: { enabled: false },
    //     pngquant: { quality: [0.65, 0.9], speed: 4 },
    //     gifsicle: { interlaced: false }
    //     // webp: { quality: 75 }
    //   })
    // }

    config.module
      .rule('tsx')
      .use('ts-loader')
      .loader('ts-loader')
      .tap(options => {
        return Object.assign(options || {}, { allowTsInNodeModules: true })
      })
    config.module
      .rule('svg')
      .exclude.add(resolve('src/svg-icon'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/svg-icon'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  devServer: {
    open: true,
    // disableHostCheck: true,
    overlay: {
      warnings: true,
      errors: true
    },
    host: myHost,
    port: 8080,
    https: false,
    // open: false,
    sockHost: myHost
  }
}
