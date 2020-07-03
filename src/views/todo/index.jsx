import "./index.less";

export default {
  name: "Todo",
  props: {
    title: {
      type: String,
      default: "asdad"
    }
  },
  render() {
    return (
      <EContainer>
        <EHeader title={this.title} type="menu" />
        <EContent>sada</EContent>
        <EFooter>sada</EFooter>
      </EContainer>
    );
  }
};
