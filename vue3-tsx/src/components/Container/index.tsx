import styles from "./index.module.less";
import { computed, defineComponent, provide, ref } from 'vue';

export default defineComponent({
  name: "Container",
  setup(props, { slots }) {
    const collapsed = ref(false);

    function setToggle(status) {
      if (status !== undefined) {
        collapsed.value = status;
        return;
      }
      collapsed.value = !collapsed.value;
    }

    provide("parent", [
      collapsed,
      setToggle
    ]);

    return () => (
      <section class={styles.wrapper}>{slots.default && slots.default()}</section>
    )
  },
});
