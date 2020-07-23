import { SharedConfig } from 'vite';
import path from 'path';

function resolve(dir: string) {
  return path.join(__dirname, dir);
}

const config: SharedConfig = {
  alias: {
    "/@/": resolve("src"),
    "/@styles/": resolve("src/assets/styles"),
  },
  cssPreprocessOptions: {
    less: {
      modifyVars: {
        'preprocess-custom-color': 'green'
      }
    }
  }
};

module.exports = config;
