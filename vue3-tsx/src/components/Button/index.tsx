import styles from "./index.module.less";
import { defineComponent, reactive, provide } from 'vue';
import classNames from 'classnames';

export default defineComponent({
  name: "Button",
  props: {
    type: {
      type: String,
      default: ""
    },
    block: {
      type: Boolean,
      default: false
    },
  },
  setup(props, { slots, attrs }) {

    return () => (
      <button class={classNames(styles.button)}>{slots.default && slots.default()}</button>
    )
  }
});
