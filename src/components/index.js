const files = require.context(".", true, /\.(vue|jsx)$/);
const modules = {};

files.keys().forEach(key => {
  const component = files(key).default;
  modules[`E${component.name}`] = component;
});

export default modules;
