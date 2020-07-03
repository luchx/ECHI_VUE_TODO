import "./index.less";

export default {
  name: "Todo",
  render() {
    return (
      <EContainer>
        <EHeader title={this.$route.meta.title} type="menu" />
        <EContent>
          45
        </EContent>
        <EFooter activeKey="todo" />
      </EContainer>
    );
  }
};
