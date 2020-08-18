import { defineComponent, reactive, App, createApp } from 'vue';
import classNames from 'classnames';
import styles from "./index.modules.less";
import { isType } from '/@/utils';

type State = {
  visible: boolean;
  title: string;
  showMask: boolean;
  timer: any
}

type DefaultOption = {
  title: string;
  delay: number;
  showMask: boolean;
}

type Options = string & DefaultOption;

const ToastComponent = defineComponent({
  name: "Toast",
  setup() {
    const state = reactive<State>({
      visible: false,
      title: "",
      showMask: false,
      timer: null,
    });

    const close = () => {
      state.visible = false;
    }

    const open = (options: Options) => {
      let defaultOptions: DefaultOption = {
        title: "",
        delay: 1500,
        showMask: false
      };
      if (isType(options) === "string") {
        defaultOptions.title = options
      } else {
        defaultOptions = Object.assign(defaultOptions, options)
      }

      state.visible = true;
      state.title = defaultOptions.title;
      state.showMask = defaultOptions.showMask;
      clearTimeout(state.timer);
      state.timer = setTimeout(() => {
        close()
      }, defaultOptions.delay)
    }

    return {
      state,
      open,
      close
    }
  },
  render() {
    const { state, close } = this;

    return state.visible ? (
      <section class={classNames({
        [styles.toastWrapper]: true,
        "animate__animated animate__fadeIn": true
      })}>
        {state.showMask && (
          <div class={styles.toastMask} onClick={close} />
        )}
        <div class={styles.toastContent}>
          {state.title}
        </div>
      </section>
    ) : null
  }
});

class ToastFn {
  private ToastInstance: any;

  constructor(options) {
    if (this.ToastInstance) {
      this.open(options);
      return this.ToastInstance;
    }
    const div = document.createElement("div");
    const ToastNode = createApp(ToastComponent);
    this.ToastInstance = ToastNode.mount(div);
    document.body.appendChild(this.ToastInstance.$el);
    this.open(options);
  }

  open(options) {
    this.ToastInstance.open(options)
  }

  close() {
    this.ToastInstance.close()
  }
}

export default (options) => new ToastFn(options)