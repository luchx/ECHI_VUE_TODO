import styles from "./index.module.less";
import { defineComponent } from 'vue';
import classNames from 'classnames';

export default defineComponent({
  name: "Button",
  props: {
    type: {
      type: String,
      default: "default"
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
  setup(props, { emit }) {
    function handleClick(event) {
      console.log(123);
      
      emit("tap", event)
    }

    return {
      handleClick
    }
  },
  render() {
    const { handleClick } = this;
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
        onClick={handleClick}
        disabled={disabled}
      >{this.$slots.default && this.$slots.default()}</button>
    )
  }
});
