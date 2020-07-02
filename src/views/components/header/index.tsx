import Vue from "vue";
import styles from "./index.less";

export default Vue.extend({
  name: "Header",
  render() {
    return <header class={styles.header}>{this.$slots.default}</header>;
  }
});
