import { App } from 'vue';
import Toast from "./Toast";
import Modal from "./Modal";

export default {
  install(app: App) {
    app.config.globalProperties.$Toast = Toast;
    app.config.globalProperties.$Modal = Modal;
  }
}

