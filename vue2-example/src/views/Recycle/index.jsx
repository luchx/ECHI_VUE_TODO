import {
  ApiGetRecycleTodoList,
  ApiDeleteTodo,
  ApiRestoreTodoFromRecycle
} from "@/api/todo";

export default {
  name: "Recycle",
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      todoList: [],
      loading: false
    };
  },
  methods: {
    async getRecycleTodoList(page = 1, pageSize = 10) {
      if (this.loading) return;
      this.loading = true;
      this.currentPage = page;
      this.pageSize = pageSize;
      const data = {
        page,
        pageSize
      };
      const resp = await ApiGetRecycleTodoList(data);
      this.loading = false;
      if (resp.code === 0) {
        const { list, pagination } = resp.result;
        const { total } = pagination;
        this.todoList = list;
        this.total = total;
      }
    },
    handleGoDetail(item) {
      this.$router.push({
        name: "TodoDetailView",
        params: {
          id: item.id
        }
      });
    },
    async handleDelete(item) {
      const { id } = item;
      const resp = await ApiDeleteTodo(id);
      if (resp.code === 0) {
        this.$toast.success("删除成功");
        this.todoList = this.todoList.filter(todo => todo.id !== id);
      }
    },
    async handleRestore(item) {
      const { id } = item;
      const resp = await ApiRestoreTodoFromRecycle(id);
      if (resp.code === 0) {
        this.$toast.success("还原成功");
        this.todoList = this.todoList.filter(todo => todo.id !== id);
      }
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
            onGoDetail={this.handleGoDetail}
            onDel={this.handleDelete}
            onRestore={this.handleRestore}
            recycle={true}
          />
        </EContent>
      </EContainer>
    );
  }
};
