import styles from "./index.module.less";
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: "Container",
  provide() {
    return {
      parent: this
    };
  },
  data() {
    return {
      collapsed: false
    };
  },
  setup(props, { slots, attrs }) {
    const state = reactive({
      collapsed: false,
    })

    console.log(state.collapsed);


    function handleToggle() {
      // if (status !== undefined) {
      //   state.collapsed = status;
      //   return;
      // }
      state.collapsed = !state.collapsed;
    }

    console.log({
      slots
    });
    

    return () => <section class={styles.wrapper} onClick={handleToggle}>
      {state.collapsed ? "1" : "2"}
      {slots}
    </section>;
  }
});
