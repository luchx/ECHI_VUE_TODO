import styles from "./index.module.less";
import { defineComponent } from 'vue';

export default defineComponent({
  name: "Content",
  render() {
    return (
      <section class={styles.content}>{this.$slots.default && this.$slots.default()}</section>
    )
  }
});
