<template>
  <EContainer>
    <EHeader title="aaa" type="menu" />
    <EContent>sada</EContent>
    <EFooter>sada</EFooter>
  </EContainer>
</template>

<script>
import EContainer from "@/views/components/container";
import EHeader from "@/views/components/header";
import EContent from "@/views/components/content";
import EFooter from "@/views/components/footer";

export default {
  name: "Todo",
  components: {
    EContainer,
    EHeader,
    EContent,
    EFooter
  }
};
</script>

<style lang="less">
@import "./index.less";
</style>
