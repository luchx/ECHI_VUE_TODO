import Vue from "vue";
import {
  ApiGetTodoList,
  ApiDeleteTodoToRecycle,
  ApiToggleFinishTodo
} from "@/api/todo";
import styles from "./index.module.less";

export default Vue.extend({
  name: "Todo",
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
    async getTodoList(page = 1, pageSize = 10) {
      if (this.loading) return;
      this.loading = true;
      this.currentPage = page;
      this.pageSize = pageSize;
      const data = {
        page,
        pageSize
      };
      const resp = await ApiGetTodoList(data);
      this.loading = false;
      if (resp.code === 0) {
        const { list, pagination } = resp.result;
        const { total } = pagination;
        this.todoList = list;
        this.total = total;
      }
    },
    async handleCheck(item) {
      const { id, status } = item;
      const resp = await ApiToggleFinishTodo(id, status);
      if (resp.code === 0) {
        this.$toast.success(resp.message);
        this.todoList = this.todoList.filter(todo => todo.id !== id);
      }
    },
    handleGoDetail(item) {
      this.$router.push({
        name: "TodoDetail",
        query: {
          id: item.id
        }
      });
    },
    async handleDelete(item) {
      const { id } = item;
      const resp = await ApiDeleteTodoToRecycle(id);
      if (resp.code === 0) {
        this.$toast.success(resp.message);
        this.todoList = this.todoList.filter(todo => todo.id !== id);
      }
    }
  },
  created() {
    this.getTodoList();
  },
  render() {
    const { todoList, loading } = this.$data;

    return (
      <EContainer>
        <EHeader
          title={this.$route.meta.title}
          type="menu"
          extra={
            <router-link
              to={{
                name: "TodoDetail"
              }}
            >
              <EButton plain type="primary" class={styles.addBtn}>
                新增
              </EButton>
            </router-link>
          }
        />
        <EAside />
        <EContent>
          <ETodoCard
            loading={loading}
            todoList={todoList}
            onCheck={this.handleCheck}
            onGoDetail={this.handleGoDetail}
            onDel={this.handleDelete}
          />
        </EContent>
        <EFooter />
      </EContainer>
    );
  }
});
