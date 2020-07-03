import styles from "./index.less";

export default {
  name: "Container",
  data() {
    return {};
  },
  render() {
    return <section class={styles.wrapper}>{this.$slots.default}</section>;
  }
};
