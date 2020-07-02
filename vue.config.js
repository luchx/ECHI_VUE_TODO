const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  lintOnSave: true,
  css: {
    requireModuleExtension: false,
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-pxtorem")({
            rootValue: 37.5,
            unitPrecision: 7,
            propList: ["*", "!font*"],
            selectorBlackList: ["ignore"],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0
          })
        ]
      },
      // 给 less-loader 传递 Less.js 相关选项
      less: {
        // globalVars: {
        //   primary: "#fff"
        // },
        modifyVars: {
          hack: `true; @import '${resolve("src/assets/styles/theme.less")}'`
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
        "@styles": resolve("@/assets/styles"),
        "@img": resolve("@/assets/image")
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
