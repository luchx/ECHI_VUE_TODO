import Vue from "vue";
import styles from "./index.less";

export default Vue.defineComponent({
  name: "Container",
  render() {
    return <section class={styles.wrapper}>{this.$slots.default}</section>;
  }
});
