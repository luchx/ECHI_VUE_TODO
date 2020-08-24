import { defineComponent, reactive, App, createApp } from 'vue';
import classNames from 'classnames';
import styles from "./index.modules.less";
import { isType } from '/@/utils';
import EButton from '/@/components/Button';

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

const ModalComponent = defineComponent({
  name: "Modal",
  setup(props, { emit }) {
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
      // clearTimeout(state.timer);
      // state.timer = setTimeout(() => {
      //   close()
      // }, defaultOptions.delay)
    }

    const confirm = () => {
      emit("confirm")
    }

    return {
      state,
      open,
      close,
      confirm,
    }
  },
  render() {
    const { state, close, confirm } = this;

    return state.visible ? (
      <section class={classNames({
        [styles.modalWrapper]: true,
        "animate__animated animate__fadeIn": true
      })}>
        {state.showMask && (
          <div class={styles.modalMask} onClick={close} />
        )}
        <div class={styles.modalContent}>
          <header class={styles.modalHeader}>
            {state.title}
          </header>
          <main class={styles.modalMain}>
            {this.$slots.default}
          </main>
          <footer class={styles.modalFooter}>
            {this.$slots.footer ? this.$slots.footer() : (
              <div>
                <EButton size="small" style="margin-right: 16px" onClick={close}>取消</EButton>
                <EButton size="small" type="primary" onClick={confirm}>确定</EButton>
              </div>
            )}
          </footer>
        </div>
      </section>
    ) : null
  }
});

class ModalFn {
  private ModalInstance: any;

  constructor(options) {
    if (this.ModalInstance) {
      this.open(options);
      return this.ModalInstance;
    }
    const div = document.createElement("div");
    const ModalNode = createApp(ModalComponent);
    this.ModalInstance = ModalNode.mount(div);
    document.body.appendChild(this.ModalInstance.$el);
    this.open(options);
  }

  open(options) {
    this.ModalInstance.open(options)
  }

  close() {
    this.ModalInstance.close()
  }
}

export default (options) => new ModalFn(options)