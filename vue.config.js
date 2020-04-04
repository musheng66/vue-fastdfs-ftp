const path = require('path')
const defaultSettings = require('./src/settings.js')
function resolve (dir) {
  return path.join(__dirname, dir)
}
const name = defaultSettings.title || 'vue-fastdfs-FTP' // page title
const port = process.env.port || process.env.npm_config_port || 8066 // dev port
module.exports = {
  publicPath: '/',

  // 输出目录
  outputDir: 'dist',

  lintOnSave: true,

  // 是否为生产环境构建生成 source map
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // proxy: { // change xxx-api/login => mock/login, detail: https://cli.vuejs.org/config/#devserver-proxy
    // }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  // alias 配置
  chainWebpack: config => {
    // config.resolve.alias
    //   .set('@', resolve('src'))

    // 一个规则里的 基础Loader
    // svg是个基础loader
    const svgRule = config.module.rule('svg')

    // 清除已有的所有 loader
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后
    svgRule.uses.clear()

    // 添加要替换的 loader
    svgRule
      .test(/\.svg$/)
      .include
      .add(resolve('src/assets/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
