import styles from "./index.less";
import classNames from "classnames";

export default {
  name: "Aside",
  inject: ["parent"],
  methods: {
    handleToggle(event) {
      event.stopPropagation();
      const { handleToggle } = this.parent;
      handleToggle(false);
    },
    handleEnter() {
      this.hide = false;
    }
  },
  render() {
    const { collapsed } = this.parent;

    return (
      <transition name="fade" onAfterEnter={this.handleEnter}>
        {collapsed && (
          <section class={styles.aside}>
            <div class={styles.asideMask} onClick={this.handleToggle}></div>
            <div class={classNames(styles.asideContent)}>asdad</div>
          </section>
        )}
      </transition>
    );
  }
};
