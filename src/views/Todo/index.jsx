import TodoCard from "./components/Card";

export default {
  name: "Todo",
  components: {
    TodoCard
  },
  render() {
    return (
      <EContainer>
        <EHeader title={this.$route.meta.title} type="menu" />
        <EContent>
          <TodoCard />
        </EContent>
        <EFooter />
      </EContainer>
    );
  }
};
