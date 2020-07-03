const files = require.context('.', true, /\.vue$/);
const modules: { [key: string]: any } = {};

files.keys().forEach(key => {
  const component = files(key).default;
  modules[`E${component.name}`] = component;
});

export default modules;
