import styles from "./index.module.less";
import { defineComponent, provide, ref } from 'vue';
import { ProvideCollapsed } from '/@/utils/constant';

export default defineComponent({
  name: "Container",
  setup(props, { slots }) {
    const collapsed = ref<boolean>(false);

    function setToggle(status) {
      if (status !== undefined) {
        collapsed.value = status;
        return;
      }
      collapsed.value = !collapsed.value;
    }

    provide(ProvideCollapsed, [
      collapsed,
      setToggle
    ]);

    return () => (
      <section class={styles.wrapper}>{slots.default && slots.default()}</section>
    )
  },
});
