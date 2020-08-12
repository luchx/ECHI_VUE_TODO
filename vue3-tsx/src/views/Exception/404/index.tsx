import { defineComponent } from 'vue';
import Exception from "../exception.vue";

export default defineComponent({
  name: "404",
  render() {
    return <Exception type="404" />;
  }
});
