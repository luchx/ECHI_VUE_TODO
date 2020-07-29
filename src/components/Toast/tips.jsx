import classNames from "classnames";
import styles from "./index.module.scss";

export default {
  data() {
    return {
      visible: false,
      title: null,
      offset: 16, //偏移值，避免直接在 dom 对象贴边出现
      top: 0,
      left: 0,
      timer: null,
      position: "top",
    };
  },
  computed: {
    tipsStyle() {
      return {
        left: this.left,
        top: this.top,
      };
    },
  },
  methods: {
    close() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.visible = false;
      }, 30);
    },
    open({ title, elRect, position }) {
      this.title = title;
      this.visible = true;
      clearTimeout(this.timer);

      this.$nextTick(() => {
        this.calcPosition(elRect, position);
      });
    },
    calcPosition(elRect, position) {
      const { left, right, top, bottom, height } = elRect;
      const clientHeight = this.$refs.main.clientHeight;
      const clientWidth = this.$refs.main.clientWidth;

      this.position = position || "top";
      switch (position) {
        case "right":
          this.left = right + this.offset + "px";
          this.top = top + height / 2 - clientHeight / 2 + "px";
          break;
        case "bottom":
          this.left = left + "px";
          this.top = bottom + this.offset + "px";
          break;
        case "left":
          this.left = left - clientWidth - this.offset + "px";
          this.top = top + height / 2 - clientHeight / 2 + "px";
          break;
        case "top":
        default:
          this.left = left + "px";
          this.top = top - clientHeight - this.offset + "px";
          break;
      }
    },
  },
  render() {
    return (
      <transition name="tips">
        {this.$data.visible && (
          <section class={styles.tipsWrapper} style={this.tipsStyle}>
            <span
              class={classNames([
                styles.tipsArrow,
                styles[`tipsArrow-${this.$data.position}`],
              ])}
            ></span>
            <main class={styles.tipsMain} ref="main">
              {this.$data.title}
            </main>
          </section>
        )}
      </transition>
    );
  },
};
