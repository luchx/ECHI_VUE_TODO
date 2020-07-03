import "./index.less";
import Vue from "vue";
import EContainer from "@/views/components/container";
import EHeader from "@/views/components/header";
import EContent from "@/views/components/content";
import EFooter from "@/views/components/footer";

export default Vue.defineComponent({
  name: "Todo",
  render() {
    return (
      <EContainer>
        <EHeader title="aaa" type="menu" />
        <EContent>sada</EContent>
        <EFooter>sada</EFooter>
      </EContainer>
    );
  }
});
