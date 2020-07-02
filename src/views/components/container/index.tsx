import Vue from "vue";
import styles from "./index.less";

export default Vue.extend({
  render() {
    return <section class={styles.wrapper}>{this.$slots.default}</section>;
  }
});
