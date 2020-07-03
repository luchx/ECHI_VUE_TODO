<template>
  <section class="footer">
    <slot></slot>
  </section>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer"
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
