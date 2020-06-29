
const files = require.context('.', true, /\.(vue)$/);
const modules: any = {};

files.keys().forEach((key: string) => {
  if (key === './index.ts') { return; }
  const component = files(key).default;
  modules[`E${component.name}`] = component;
});

export default modules;
