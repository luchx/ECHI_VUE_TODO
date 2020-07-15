import styles from "./index.module.less";
import { ApiGetFinishedTodoList } from "@/api/todo";

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
        this.todoList = list;
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
          {Object.keys(todoData).map(date => (
            <div>
              <div class={styles.titleBar}>
                <van-divider class="divider">{date}</van-divider>
              </div>
              <ETodoCard
                loading={loading}
                todoList={todoData[date]}
                onGoDetail={this.handleGoDetail}
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
