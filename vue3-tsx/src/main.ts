import "lib-flexible";
import "animate.css";
import "normalize.css";
import "/@/assets/styles/global.less";
import { createApp } from 'vue';
import App from '/@/App';
import router from '/@/router';
import store from '/@/store';

import moment from "moment";
moment.locale("zh-cn");

import Toast from "/@/components/Toast";

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

app.config.globalProperties.$moment = moment;

app.use(Toast)

app.use(router)
  .use(store)
  .mount('#app');
