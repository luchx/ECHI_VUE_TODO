import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import EContainer from "/@/components/Container"
import { Toast } from "/@/components/Toast"

const toast = Toast({
  title: '111'
});

setTimeout(() => {
  toast.close()
}, 500)

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore()

    return () => (
      <EContainer>
        <h1>Home</h1>
        <h1>{store.state.title}</h1>
      </EContainer>
    );
  }
});