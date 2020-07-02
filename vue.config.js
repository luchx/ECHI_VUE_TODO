const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  css: {
    requireModuleExtension: false,
    loaderOptions: {
      // 给 less-loader 传递 Less.js 相关选项
      less: {
        globalVars: {
          primary: "#fff"
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
