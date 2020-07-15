import { ApiGetRecycleTodoList } from "@/api/todo";

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
      this.loading = true;
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
            recycle={true}
          />
        </EContent>
        <EFooter />
      </EContainer>
    );
  }
};
