import "lib-flexible";
import "normalize.css";
import "@/assets/styles/global.less";
import Vue from "vue";
import App from "@/App.vue";
import "@/registerServiceWorker";
import router from "@/router";
import store from "@/store";
import components from "@/components";

// 引入 vant 组件库
import "@/vant";

// 接入 mockjs
if (process.env.VUE_APP_MOCK) {
  require("@/mock");
}

import FastClick from "fastclick";
if ("addEventListener" in document) {
  document.addEventListener(
    "load",
    function() {
      FastClick.attach(document.body);
    },
    false
  );
}

import moment from "moment";
moment.locale("zh-cn");
Vue.prototype.$moment = moment;

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
