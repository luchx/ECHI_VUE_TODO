import styles from "./index.module.less";
import { defineComponent, reactive, provide } from 'vue';

export default defineComponent({
  name: "Container",
  provide() {
    return {
      parent: this
    };
  },
  setup(props, { slots }) {
    const data = reactive({
      collapsed: false,
    });
    provide("parent", {
      handleToggle,
    })

    function handleToggle(status) {
      if (status !== undefined) {
        data.collapsed = status;
        return;
      }
      data.collapsed = !data.collapsed;
    }

    return () => (
      <section class={styles.wrapper}>{slots}</section>
    )
  }
});
