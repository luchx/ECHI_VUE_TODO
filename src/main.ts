import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";

import VueCompositionApi from "@vue/composition-api";

// 注册全局的组件
import components from "@/components";
Object.keys(components).forEach((key) => {
  Vue.component(key, components[key]);
});

Vue.use(VueCompositionApi);

new Vue({
  router,
  el: "#app",
  render: h => h(App)
});
