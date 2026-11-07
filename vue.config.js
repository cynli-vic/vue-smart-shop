const { defineConfig } = require('@vue/cli-service')

module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://smart-shop.itheima.net',
        changeOrigin: true,
        xfwd: false,
        pathRewrite: (path) => '/index.php?s=' + path.replace('?', '&')
      }
    }
  }
}