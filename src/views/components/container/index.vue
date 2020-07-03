<template>
  <section class="wrapper">
    <slot></slot>
  </section>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Container"
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
