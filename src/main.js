import "lib-flexible";
import "normalize.css";
import "@/assets/styles/global.less";
import Vue from "vue";
import App from "@/App.vue";
import "@/registerServiceWorker";
import router from "@/router";
import store from "@/store";
import components from "@/components";

import {
  Button,
  SwipeCell,
  Dialog,
  Toast,
  Field,
  Divider,
  Popup,
  DatetimePicker,
  Calendar
} from "vant";
Vue.use(Button);
Vue.use(SwipeCell);
Vue.use(Dialog);
Vue.use(Toast);
Vue.use(Field);
Vue.use(Divider);
Vue.use(Popup);
Vue.use(DatetimePicker);
Vue.use(Calendar);

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
