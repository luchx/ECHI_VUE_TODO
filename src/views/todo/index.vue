<template>
  <EContainer>
    <EHeader :title="title" type="menu" />
    <EContent>sada</EContent>
    <EFooter>sada</EFooter>
  </EContainer>
</template>

<script>
import { defineComponent } from "vue";
// import EContainer from "@/views/components/container";
// import EHeader from "@/views/components/header";
// import EContent from "@/views/components/content";
// import EFooter from "@/views/components/footer";

export default defineComponent({
  name: "Todo",
  // components: {
  //   EContainer,
  //   EHeader,
  //   EContent,
  //   EFooter
  // },
  props: {
    title: {
      type: String,
      default: "asdad"
    }
  },
  setup(props) {
    console.log({
      props
    });
    return {};
  }
});
</script>

<style lang="less">
@import "./index.less";
</style>
