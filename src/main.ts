import "lib-flexible";
import "normalize.css";
import "/@/assets/styles/global.less";
import { createApp } from 'vue';
import App from '/@/App';
import router from '/@/router';
import store from '/@/store';

// 添加 fastclick
if ("addEventListener" in document) {
  document.addEventListener(
    "load",
    function() {
      require("fastclick").attach(document.body);
    },
    false
  );
}

import moment from "moment";
moment.locale("zh-cn");

const vm = createApp(App);

// 引入全局挂载组件
// import components from "/@/components";
// vm.use(components)

vm.use(router)
  .use(store)
  .mount('#app');