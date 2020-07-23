interface Modules {
  [key: string]: object;
}

const modules: Modules = {};

const files = require.context(".", true, /\.(vue|tsx)$/);
files.keys().forEach(key => {
  const component = files(key).default;
  modules[`E${component.name}`] = component;
});

console.log({
  modules
});


export default modules;
