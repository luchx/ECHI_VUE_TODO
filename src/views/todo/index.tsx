import "./index.less";

import Vue from "vue";
import EContainer from "@/views/components/container";
import EHeader from "@/views/components/header";
import EContent from "@/views/components/content";
import EFooter from "@/views/components/footer";

export default Vue.extend({
  name: "Todo",
  render() {
    return (
      <EContainer>
        <EHeader>
          <i class="iconfont">&#xe60f;</i>
        </EHeader>
        <EContent>sada</EContent>
        <EFooter>sada</EFooter>
      </EContainer>
    );
  }
});
