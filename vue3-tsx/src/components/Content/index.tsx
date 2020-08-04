import styles from "./index.module.less";
import { defineComponent } from 'vue';

export default defineComponent({
  name: "Content",
  setup(props, { slots }) {
    return () => (
      <section class={styles.content}>{slots.default && slots.default()}</section>
    )
  }
});
