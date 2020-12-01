import { defineComponent, Transition } from 'vue';
import { RouterView, useRoute } from 'vue-router';

export default defineComponent({
  name: 'App',
  render() {
    const route = useRoute();

    return (
      <Transition name={route.meta.transition} mode="in-out">
        <RouterView />
      </Transition>
    );
  }
});