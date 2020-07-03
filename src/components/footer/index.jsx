import styles from "./index.less";

export default {
  name: "Footer",
  render() {
    return <section class={styles.footer}>{this.$slots.default}</section>;
  },
};
