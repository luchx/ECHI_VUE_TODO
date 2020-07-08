import styles from "./index.module.less";
import { ApiGetTodoList } from "@/api/todo";

export default {
  name: "Review",
  data() {
    return {
      todoList: [],
      loading: false,
      visible: false,
      todoDetail: {},
    };
  },
  methods: {
    async getTodoList() {
      this.loading = true;
      const resp = await ApiGetTodoList();
      this.loading = false;
      if (resp.code === 0) {
        this.todoList = resp.data.list;
        console.log(resp.data);
      }
    },
    handleCheck(item) {
      const { id, isFinished } = item;
      this.todoList = this.todoList.filter((todo) => todo.id !== id);
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
          id: item.id,
        },
      });
    },
    handleUpdate({ visible }) {
      this.visible = visible;
    },
  },
  mounted() {
    this.getTodoList();
  },
  render() {
    const { todoList, loading } = this.$data;

    return (
      <EContainer>
        <EHeader title={this.$route.meta.title} type="menu" />
        <EAside />
        <EContent>
          <div class={styles.reviewHeader}>
            <div class={styles.rateBox}>
              <van-rate value={3.5} color="#f5222d" allowHalf={true} />
            </div>
            <div class={styles.reviewBox}>
              <div class={styles.reviewBoxItem}>
                本周完成：<span>5</span>
              </div>
              <div class={styles.reviewBoxItem}>
                本周评分：<span>5星</span>
              </div>
              <div class={styles.reviewBoxItem}>
                本周效率：<span>高</span>
              </div>
            </div>
          </div>
          <van-divider class="divider">完成任务</van-divider>
          <ETodoCard
            loading={loading}
            todoList={todoList}
            onCheck={this.handleCheck}
            onGoDetail={this.handleGoDetail}
          />
        </EContent>
        <EFooter />
      </EContainer>
    );
  },
};
