import path from 'path';
import { ServerConfig } from "vite";

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

const config: ServerConfig = {
  port: 8000,
  jsx: "vue",
  alias: {
    "/@/": resolve("src"),
  },
  cssPreprocessOptions: {
    less: {
      modifyVars: {
        hack: `true; @import '${resolve("src/assets/styles/theme.less")}'`
      }
    }
  },
  // 引入第三方的配置
  optimizeDeps: {
    include: ["moment", "axios", "vant"]
  }
};

module.exports = config;
