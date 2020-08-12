import { defineComponent } from 'vue';
import Exception from "../exception.vue";

export default defineComponent({
  name: "403",
  render() {
    return <Exception type="403" />;
  }
});
