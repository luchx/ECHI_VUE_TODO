import { createApp } from "vue";
import App from "@/App.vue";
import "@/registerServiceWorker";
import router from "@/router";
import store from "@/store";
import "lib-flexible";
import "normalize.css";
import "@/assets/styles/global.less";

createApp(App)
  .use(router)
  .use(store)
  .mount("#app");
