import styles from "./index.module.less";
import classNames from "classnames";

export default {
  name: "Aside",
  inject: ["parent"],
  data() {
    return {
      show: false
    };
  },
  methods: {
    handleToggle(event) {
      event.stopPropagation();
      const { handleToggle } = this.parent;
      handleToggle(false);
    },
    handleEnter() {
      this.show = true;
    },
    handleLeave() {
      this.show = false;
    }
  },
  render() {
    const { collapsed } = this.parent;
    const { show } = this.$data;

    return (
      <transition
        name="fade"
        onAfterEnter={this.handleEnter}
        onBeforeLeave={this.handleLeave}
      >
        {collapsed && (
          <section class={styles.aside}>
            <div class={styles.asideMask} onClick={this.handleToggle}></div>
            <div
              class={classNames(styles.asideContent, { [styles.show]: show })}
            >
              asdad
            </div>
          </section>
        )}
      </transition>
    );
  }
};
