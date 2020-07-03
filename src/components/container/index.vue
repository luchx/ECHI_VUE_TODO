<template>
  <section class="wrapper">
    <slot></slot>
  </section>
</template>
<script>
export default {
  name: "Container"
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
