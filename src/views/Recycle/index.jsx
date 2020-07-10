import { ApiGetRecycleTodoList } from "@/api/todo";

export default {
  name: "Recycle",
  data() {
    return {
      todoList: [],
      loading: false
    };
  },
  methods: {
    async getRecycleTodoList() {
      this.loading = true;
      const resp = await ApiGetRecycleTodoList();
      this.loading = false;
      if (resp.code === 0) {
        this.todoList = resp.result.list;
      }
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
    handleGoDetail(item) {
      this.$router.push({
        name: "TodoDetail",
        params: {
          id: item.id
        }
      });
    }
  },
  mounted() {
    this.getRecycleTodoList();
  },
  render() {
    const { todoList, loading } = this.$data;

    return (
      <EContainer>
        <EHeader title={this.$route.meta.title} type="menu" />
        <EAside />
        <EContent>
          <ETodoCard
            loading={loading}
            todoList={todoList}
            onCheck={this.handleCheck}
            onGoDetail={this.handleGoDetail}
            recycle={true}
          />
        </EContent>
        <EFooter />
      </EContainer>
    );
  }
};
