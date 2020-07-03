import Vue from "vue";
import styles from "./index.less";

export default Vue.defineComponent({
  name: "Footer",
  render() {
    return <footer class={styles.footer}>{this.$slots.default}</footer>;
  }
});
