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
    console.log({
      props,
      attrs
    });


    return () => (
      <button class={classNames(styles.button)}>{slots}</button>
    )
  }
});
