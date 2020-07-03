import styles from "./index.less";

export default {
  name: "Content",
  render() {
    return <section class={styles.content}>{this.$slots.default}</section>;
  },
};
