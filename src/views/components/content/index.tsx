import Vue from "vue";
import styles from "./index.less";

export default Vue.extend({
  name: "Content",
  render() {
    return <main class={styles.main}>{this.$slots.default}</main>;
  }
});
