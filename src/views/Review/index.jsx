export default {
  name: "Review",
  data() {
    return {
      todoList: [],
      visible: false,
      todoDetail: {}
    };
  },
  methods: {
    getTodoList() {
      this.todoList = [
        {
          id: 1,
          title: "这是一段描述文字",
          description: "这是一段描述文字",
          date: "2020-07-04 15:06",
          status: 1,
          isFinished: true
        },
        {
          id: 2,
          title: "这是一段描述文字",
          description: "这是一段描述文字",
          date: "2020-08-03 11:28",
          status: 2,
          isFinished: false
        },
        {
          id: 3,
          title: "这是一段描述文字这是一段描述文字这是一段描述文字",
          description: "这是一段描述文字",
          date: "2020-03-03 19:11",
          status: 2,
          isFinished: false
        },
        {
          id: 4,
          title: "这是一段描述文字这是一段描述文字这是一段描述文字",
          description: "这是一段描述文字",
          date: "2020-07-04 19:11",
          status: 2,
          isFinished: false
        }
      ].sort((a, b) => {
        return b.status - a.status;
      });
    },
    handleCheck(item) {
      const { id, isFinished } = item;
      this.todoList = this.todoList.filter(todo => todo.id !== id);
      if (isFinished) {
        this.todoList.push(item);
      } else {
        this.todoList.unshift(item);
      }
    },
    handleGoDetail(event, item) {
      this.visible = true;
      this.todoDetail = item;
      this.$router.push({
        name: "TodoDetail",
        params: {
          id: item.id
        }
      });
    },
    handleUpdate({ visible }) {
      this.visible = visible;
    }
  },
  mounted() {
    this.getTodoList();
  },
  render() {
    const { todoList, visible, todoDetail } = this.$data;

    return (
      <EContainer>
        <router-view
          visible={visible}
          todo={todoDetail}
          onUpdate={this.handleUpdate}
        />
        <EHeader title={this.$route.meta.title} type="menu" />
        <EAside />
        <EContent>
          <ETodoCard
            todoList={todoList}
            onCheck={this.handleCheck}
            onGoDetail={this.handleGoDetail}
          />
        </EContent>
        <EFooter />
      </EContainer>
    );
  }
};
