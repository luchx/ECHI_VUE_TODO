import styles from "./index.module.less";
import classNames from "classnames";

export default {
  name: "Header",
  inject: ["parent"],
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
    },
    goBack: {
      type: Function,
      default: null
    }
  },
  methods: {
    handleToggle() {
      const { handleToggle } = this.parent;
      handleToggle(true);
    },
    handleBack() {
      const { goBack } = this.$props;
      if (typeof goBack === "function") {
        goBack();
        return;
      }
      this.$router.back();
    }
  },
  render() {
    const { type, title, extra } = this.$props;

    return (
      <header class={styles.header}>
        {type === "back" ? (
          <i
            class={classNames("iconfont", styles.icon)}
            onClick={this.handleBack}
          >
            &#xe60f;
          </i>
        ) : (
          <i
            class={classNames("iconfont", styles.icon)}
            onClick={this.handleToggle}
          >
            &#xe61f;
          </i>
        )}
        <span class={styles.title}>{title}</span>
        <span class={styles.extra}>{extra}</span>
      </header>
    );
  }
};
