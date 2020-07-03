import "lib-flexible";
import "normalize.css";
import "@/assets/styles/global.less";
import Vue from "vue";
import App from "@/App.vue";
import "@/registerServiceWorker";
import router from "@/router";
import store from "@/store";
import components from "@/components";

// 注册全局的组件
Object.keys(components).forEach(key => {
  Vue.component(key, components[key]);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
