<template>
  <section class="main">
    <slot></slot>
  </section>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Content"
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
