import { defineComponent } from 'vue';
import Exception from "../exception.vue";

export default defineComponent({
  name: "500",
  render() {
    return <Exception type="500" />;
  }
});
