import TodoCard from "./components/Card";

export default {
  name: "Todo",
  components: {
    TodoCard
  },
  data() {
    return {
      todoList: [
        {
          id: 1,
          title: "这是一段描述文字",
          date: "2020-07-04 11:28",
          status: 1
        },
        {
          id: 2,
          title: "这是一段描述文字",
          date: "2020-08-03 11:28",
          status: 2
        },
        {
          id: 3,
          title: "这是一段描述文字这是一段描述文字这是一段描述文字",
          date: "2020-03-03 11:28",
          status: 2
        }
      ]
    };
  },
  render() {
    return (
      <EContainer>
        <EHeader title={this.$route.meta.title} type="menu" />
        <EAside />
        <EContent>
          <TodoCard todoList={this.$data.todoList} />
        </EContent>
        <EFooter />
      </EContainer>
    );
  }
};
