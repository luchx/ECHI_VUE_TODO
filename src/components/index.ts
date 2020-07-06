interface Modules {
  [key: string]: object;
}

const modules: Modules = {};

const files = require.context(".", true, /\.(vue|jsx)$/);
files.keys().forEach(key => {
  const component = files(key).default;
  modules[`E${component.name}`] = component;
});

export default modules;
