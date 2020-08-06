
import { defineComponent, reactive, App, createApp } from 'vue';
import styles from "./index.modules.less";

const ToastComponent = defineComponent({
  name: "Toast",
  setup() {
    const data = reactive({
      visible: false,
      title: ""
    });

    const open = ({ title }) => {
      data.visible = true;
      data.title = title;
    }

    const close = () => {
      data.visible = false;
    }

    return {
      data,
      open,
      close
    }
  },
  render() {
    const { data, close } = this;

    return data.visible ? (
      <section class={styles.toastWrapper}>
        <div class={styles.toastMask} onClick={close}></div>
        <div class={styles.toastContent}>
          {data.title}
        </div>
      </section>
    ) : null
  }
});

class ToastFn {
  private ToastInstance: any;

  constructor() {
    if (this.ToastInstance) {
      return this.ToastInstance;
    }
    const div = document.createElement("div");
    const ToastNode = createApp(ToastComponent);
    this.ToastInstance = ToastNode.mount(div);
    document.body.appendChild(this.ToastInstance.$el);
  }

  open(options) {
    this.ToastInstance.open(options)
  }

  close() {
    this.ToastInstance.close()
  }
}

export default {
  toast: new ToastFn(),
  install(app: App) {

    app.config.globalProperties.$Toast = new ToastFn()
  }
}

export const Toast = new ToastFn();