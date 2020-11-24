import path from 'path';

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

const config = {
  port: 8000,
  alias: {
    "/@/": resolve("src"),
  },
  cssPreprocessOptions: {
    less: {
      modifyVars: {
        hack: `true; @import '${resolve("src/assets/styles/theme.less")}'`
      }
    }
  }
};

module.exports = config;
