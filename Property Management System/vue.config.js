const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // 反向代理，解决跨域
    proxy: {
      "/api": {
        target: "http://60.205.2.196/", // 后端服务地址
        changeOrigin: true, // 修改请求源
        pathRewrite: { "^/api": "/" } // 重写路径
      }
    }
  }
})
