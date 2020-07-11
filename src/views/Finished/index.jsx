import styles from "./index.module.less";
import { ApiGetFinishedTodoList } from "@/api/todo";

export default {
  name: "Finished",
  data() {
    return {
      todoData: [],
      loading: false
    };
  },
  methods: {
    async getFinishedTodoList() {
      this.loading = true;
      const resp = await ApiGetFinishedTodoList();
      this.loading = false;
      if (resp.code === 0) {
        this.todoData = resp.result.data;
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
