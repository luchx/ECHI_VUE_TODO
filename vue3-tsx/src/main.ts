import "lib-flexible";
import "animate.css";
import "normalize.css";
import "/@/assets/styles/global.less";
import { createApp } from 'vue';
import App from '/@/App';
import router from '/@/router';
import store from '/@/store';

// 接入 mockjs
// if (process.env.VITE_MOCK) {
//   require("/@/mock");
// }

// 添加 fastclick
if ("addEventListener" in document) {
  document.addEventListener(
    "load",
    function () {
      require("fastclick").attach(document.body);
    },
    false
  );
}

const app = createApp(App);

import moment from "moment";
moment.locale("zh-cn");
app.config.globalProperties.$moment = moment;

import component from "/@/components";
app.use(component)

app.use(router)
  .use(store)
  .mount('#app');
