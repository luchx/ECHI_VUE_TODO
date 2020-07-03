import "lib-flexible";
import "normalize.css";
import "@/assets/styles/global.less";
import { createApp } from "vue";
import App from "@/App.vue";
import "@/registerServiceWorker";
import router from "@/router";
import store from "@/store";
import components from "@/components";

const app = createApp(App)

// app.config.ignoredElements = [/^app-/]
app.use(router).use(store)
// app.mixin(/* ... */)
// app.directive(/* ... */)

// 注册全局的组件
Object.keys(components).forEach((key) => {
  app.component(key, components[key]);
});

app.mount('#app')