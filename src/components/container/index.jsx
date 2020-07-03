import styles from "./index.less";

export default {
  name: "Container",
  render() {
    return <section class={styles.wrapper}>{this.$slots.default}</section>;
  },
};
