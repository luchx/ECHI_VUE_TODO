import Vue from "vue";
import classNames from "classnames";
import styles from "./index.less";

export default Vue.defineComponent({
  name: "Header",
  props: {
    title: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "back"
    },
    extra: {
      type: Object,
      default: null
    }
  },
  render() {
    return (
      <header class={styles.header}>
        {this.$props.type === "back" ? (
          <i class={classNames("iconfont", styles.icon)}>&#xe60f;</i>
        ) : (
          <i class={classNames("iconfont", styles.icon)}>&#xe61f;</i>
        )}
        <span class={styles.title}>{this.$props.title}</span>
        <span class={styles.extra}>{this.$props.extra}</span>
      </header>
    );
  }
});
