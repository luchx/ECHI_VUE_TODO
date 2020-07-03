import styles from "./index.less";

export default {
  name: "Aside",
  render() {
    return <section class={styles.aside}>{this.$slots.default}</section>;
  }
};
