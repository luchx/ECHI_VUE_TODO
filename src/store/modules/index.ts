const files = require.context(".", false, /\.ts$/);
const modules: { [key: string]: any } = {};

files.keys().forEach(key => {
  if (key === "./index.ts") {
    return;
  }
  modules[key.replace(/(\.\/|\.ts)/g, "")] = files(key).default;
});

export default modules;
