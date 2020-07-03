import styles from "./index.less";
import classNames from "classnames";

export default {
  name: "Header",
  props: {
    title: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "back",
    },
    extra: {
      type: Object,
      default: null,
    },
  },
  render() {
    const { type, title, extra } = this.$props;
    return (
      <header class={styles.header}>
        {type === "back" ? (
          <i class={classNames("iconfont", styles.icon)}>&#xe60f;</i>
        ) : (
          <i class={classNames("iconfont", styles.icon)}>&#xe61f;</i>
        )}
        <span class={styles.title}>{title}</span>
        <span class={styles.extra}>{extra}</span>
      </header>
    );
  },
};
