import styles from "./index.module.less";
import { defineComponent, provide, ref } from 'vue';

function useCollapsed() {
  const collapsed = ref(true);

  function setToggle(status) {
    if (status !== undefined) {
      collapsed.value = status;
      return;
    }
    collapsed.value = !collapsed;
  }
  provide("parent", [
    collapsed,
    setToggle
  ]);
}

export default defineComponent({
  name: "Container",
  setup() {
    useCollapsed()
  },
  render() {
    return (
      <section class={styles.wrapper}>{this.$slots.default && this.$slots.default()}</section>
    )
  }
});
