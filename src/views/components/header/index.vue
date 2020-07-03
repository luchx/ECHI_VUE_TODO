<template>
  <header class="header">
    <i class="iconfont icon" v-if="type === 'back'">&#xe60f;</i>
    <i class="iconfont icon" v-else>&#xe61f;</i>
    <span class="title">{{ title }}</span>
    <span class="extra">{{ extra }}</span>
  </header>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
  props: {
    title: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "back"
    },
    extra: {
      type: Object,
      default: null
    }
  }
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
