# Vue-todo 应用

> 使用 Vue 开发的一款 TODO 应用，包含登录、待办、日程、历史事项、回收站。项目较为小型，适合进阶学习使用（💡请注意，项目大量使用 jsx 进行开发）。

1. 👍 用于学习 jsx 使用
2. 👍 学习 vue3 语法的最佳实践
3. 👍 一个小型而又不失精华的项目
4. 👍 提供模板，可以用于扩展你的其他技术实践

## 项目分支说明

> 目前项目 vue2 版的前端部分已完善（后端接口暂时使用 mockjs）。接下来将会使用 node 进行后端的开发。
> Vue3 版的正在调整中，感兴趣的可以运行 vue3-tsx 查看😍。

🍂 vue2-example 文件下是使用 vue-cli 创建，搭配技术栈为 vue2.6 + jsx、ts、less、vant-ui、mockjs

🚀 vue3-tsx 文件下是使用 vite 创建，搭配技术栈为 vue3 + jsx、ts、less、mockjs

## 开发使用

```bash
  git clone git@github.com:luchx/ECHI_VUE_TODO.git
  cd ECHI_VUE_TODO
  npm install
  npm run serve:mock         # 访问 http://localhost:9000
```

## 项目中使用自适应方案

See [Configuration Reference](https://cli.vuejs.org/config/).

移动端兼容方案采用 lib-flexible + px2rem, 按照设计稿 750 标准开发， 详细说明：<https://github.com/amfe/article/issues/17>

- 直接写 px，编译后会直接转化成 rem —- 除开下面两种情况，其他长度用这个
- 在 px 后面添加/_no_/，不会转化 px，会原样输出，一般 border 需用这个
- 在 px 后面添加/_px_/,会根据 dpr 的不同，生成三套代码，一般字体需用这个
