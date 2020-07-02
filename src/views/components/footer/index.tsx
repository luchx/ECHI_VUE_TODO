import Vue from "vue";
import styles from "./index.less";

export default Vue.extend({
  render() {
    return <footer class={styles.footer}>{this.$slots.default}</footer>;
  }
});
