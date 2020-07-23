import styles from "./index.module.less";
import { ApiGetFinishedTodoList, ApiDeleteTodoToRecycle } from "@/api/todo";

export default {
  name: "Finished",
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      todoData: [],
      loading: false
    };
  },
  methods: {
    async getFinishedTodoList(page = 1, pageSize = 10) {
      if (this.loading) return;
      this.loading = true;
      this.currentPage = page;
      this.pageSize = pageSize;
      const data = {
        page,
        pageSize
      };
      const resp = await ApiGetFinishedTodoList(data);
      this.loading = false;
      if (resp.code === 0) {
        const { list, pagination } = resp.result;
        const { total } = pagination;
        this.todoData = list;
        this.total = total;
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
        this.$toast.success("删除成功");
      }
    }
  },
  mounted() {
    this.getFinishedTodoList();
  },
  render() {
    const { todoData, loading } = this.$data;

    return (
      <EContainer>
        <EHeader title={this.$route.meta.title} type="menu" />
        <EAside />
        <EContent class={styles.wrapper}>
          {todoData.map(item => (
            <div>
              <div class={styles.titleBar}>
                <van-divider class="divider">{item.date}</van-divider>
              </div>
              <ETodoCard
                loading={loading}
                todoList={item.list}
                onGoDetail={this.handleGoDetail}
                onDel={this.handleDelete}
                style={{
                  paddingTop: 0,
                  paddingBottom: 0
                }}
              />
            </div>
          ))}
        </EContent>
        <EFooter />
      </EContainer>
    );
  }
};
