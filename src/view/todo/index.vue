<template>
  <EContainer>
    TODO
  </EContainer>
</template>

<script>
  import { reactive, computed } from '@vue/composition-api'

  export default {
    name: 'Todo',
    setup() {
      const state = reactive({
        count: 0,
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