import Vue from "vue";
import styles from "./index.less";

export default Vue.extend({
  render() {
    return <header class={styles.header}>{this.$slots.default}</header>;
  }
});
