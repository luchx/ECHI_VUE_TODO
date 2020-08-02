import styles from "./index.module.less";

export default {
  name: "Container",
  provide() {
    return {
      parent: this
    };
  },
  data() {
    return {
      collapsed: false
    };
  },
  methods: {
    handleToggle(status) {
      if (status !== undefined) {
        this.collapsed = status;
        return;
      }
      this.collapsed = !this.collapsed;
    }
  },
  render() {
    return <section class={styles.wrapper}>{this.$slots.default}</section>;
  }
};
