import "./index.less";

export default {
  name: "Date",
  render() {
    return (
      <EContainer>
        <EHeader title={this.$route.meta.title} type="menu" />
        <EAside />
        <EContent>date</EContent>
        <EFooter />
      </EContainer>
    );
  }
};
