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
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {

    return () => (
      <button class={classNames([
        styles.button,
        styles[`button-${props.type}`],
        {
          [styles.block]: props.block,
        }
      ])} disabled={props.disabled}>{slots}</button>
    )
  }
});
