<template>
  <button @click="increment">
    Count is: {{ state.count }}, double is: {{ state.double }}
    <img :src="state.DEFAULT_PNG" />
  </button>
</template>

<script>
import DEFAULT_PNG from '@/assets/default.png';
  import { reactive, computed } from '@vue/composition-api'

  export default {
    setup() {
      const state = reactive({
        count: 0,
        DEFAULT_PNG,
        double: computed(() => state.count * 2),
      })

      function increment() {
        state.count++
      }

      return {
        state,
        increment,
      }
    },
  }
</script>