type Module = {
    [key: string]: any
}

const files = require.context('.', true, /\.(vue|tsx)$/);
const modules: Module = {};

files.keys().forEach((key) => {
    if (key === './index.ts') { return; }
    const component = files(key).default;
    modules[`E${component.name}`] = component;
});

export default modules;
