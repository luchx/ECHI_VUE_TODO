const files = require.context('.', true, /\.(vue|tsx)$/);
const modules: { [key: string]: any } = {};

files.keys().forEach(key => {
  if (key === "./index.js") {
    return;
  }
  const component = files(key).default;
  modules[`E${component.name}`] = component;
});

export default modules;
