import styles from "./index.module.less";
import { defineComponent, reactive, provide } from 'vue';

export default defineComponent({
  name: "Container",
  setup() {
    provide("parent", this);

    const data = reactive({
      collapsed: false,
    });
    
    function handleToggle(status) {
      if (status !== undefined) {
        data.collapsed = status;
        return;
      }
      data.collapsed = !data.collapsed;
    }

    return {
      handleToggle
    }
  },
  render() {
    return (
      <section class={styles.wrapper}>{this.$slots.default && this.$slots.default()}</section>
    )
  }
});
