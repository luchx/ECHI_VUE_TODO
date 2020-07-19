const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  outputDir: "docs",
  lintOnSave: true,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-px2rem")({
            remUnit: 37.5,
            baseDpr: 1
          })
        ]
      },
      // 给 less-loader 传递 Less.js 相关选项
      less: {
        modifyVars: {
          hack: `true; @import '${resolve("src/assets/styles/theme.less")}'`
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src")
      }
    }
  },
  devServer: {
    port: "9000",
    open: true,
    historyApiFallback: true,
    disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*"
    }
  }
};
