import Vue from "vue";
import styles from "./index.less";

export default Vue.extend({
  render() {
    return <main class={styles.main}>{this.$slots.default}</main>;
  }
});
