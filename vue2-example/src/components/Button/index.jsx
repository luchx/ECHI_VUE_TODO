import styles from "./index.module.less";
import classNames from "classnames";

export default {
  name: "Button",
  props: {
    type: {
      type: String,
      default: "default",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "normal",
    },
    plain: {
      type: Boolean,
      default: false,
    },
    square: {
      type: Boolean,
      default: false,
    },
  },
  render() {
    const { block, size, disabled, type, plain, square } = this.$props;

    return (
      <button
        class={classNames({
          [styles.button]: true,
          [styles[`button-${size}`]]: true,
          [styles[`button-${type}`]]: true,
          [styles["button-block"]]: block,
          [styles["button-disabled"]]: disabled,
          [styles["button-plain"]]: plain,
          [styles["button-square"]]: square,
        })}
        disabled={disabled}
        onClick={event => this.$emit("click", event)}
      >
        {this.$slots.default}
      </button>
    );
  },
};
