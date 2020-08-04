import styles from "./index.module.less";
import { defineComponent } from 'vue';
import classNames from 'classnames';

export default defineComponent({
  name: "Button",
  props: {
    type: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'normal'
    },
  },
  render() {
    const { block, size, disabled, type } = this.$props;

    return (
      <button
        class={classNames({
          [styles.button]: true,
          [styles[`button-${size}`]]: true,
          [styles[`button-${type}`]]: true,
          [styles["button-block"]]: block,
          [styles["button-disabled"]]: disabled,
        })}
        disabled={disabled}
      >{this.$slots.default && this.$slots.default()}</button>
    )
  }
});
