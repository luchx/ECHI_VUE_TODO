# vue-todo

## Project setup

```bash
yarn install
```

### Compiles and hot-reloads for development

```bash
yarn serve
```

### Compiles and minifies for production

```bash
yarn build
```

### Lints and fixes files

```bash
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

移动端兼容方案采用 lib-flexible + px2rem, 按照设计稿 750 标准开发， 详细说明：https://github.com/amfe/article/issues/17

- 直接写 px，编译后会直接转化成 rem —- 除开下面两种情况，其他长度用这个
- 在 px 后面添加/_no_/，不会转化 px，会原样输出，一般 border 需用这个
- 在 px 后面添加/_px_/,会根据 dpr 的不同，生成三套代码，一般字体需用这个
