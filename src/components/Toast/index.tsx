import styles from "./index.module.less";
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: "Toast",
  setup() {
    const state = reactive({
      visible: false,
      title: null,
      timer: 0,
    });

    function close() {
      state.visible = false;
    }

    function open({ title }) {
      state.title = title;
      state.visible = true;
      clearTimeout(state.timer);
      state.timer = setTimeout(() => {
        state.visible = false;
      }, 1500);
    }

    return () => (
      <transition name="tips">
        {state.visible && (
          <section class={styles.tipsWrapper}>
            <main class={styles.tipsMain}>
              {state.title}
            </main>
          </section>
        )}
      </transition>
    );
  }
});
