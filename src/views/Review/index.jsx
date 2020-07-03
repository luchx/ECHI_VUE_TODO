import "./index.less";

export default {
  name: "Review",
  render() {
    return (
      <EContainer>
        <EHeader title={this.$route.meta.title} type="menu" />
        <EContent>review</EContent>
        <EFooter />
      </EContainer>
    );
  }
};
