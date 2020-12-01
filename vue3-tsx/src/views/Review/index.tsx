import styles from "./index.module.less";
import { ApiGetReviewTodoList, ApiDeleteTodoToRecycle } from "/@/api/todo";
import { defineComponent } from 'vue';
import EContainer from '/@/components/Container';
import EHeader from '/@/components/Header';
import EContent from '/@/components/Content';
import EAside from '/@/components/Aside';
import EFooter from '/@/components/Footer';
import ETodoCard from '/@/components/TodoCard/index.vue';

export default defineComponent({
  name: "Review",
  data() {
    return {
      todoList: [],
      loading: false,
      visible: false,
      todoDetail: {},
      taskData: {}
    };
  },
  computed: {
    ratioText() {
      const { rate } = this.taskData;
      if (rate <= 3) {
        return "低";
      } else if (rate <= 4) {
        return "中";
      }
      return "高";
    }
  },
  methods: {
    async getReviewTodoList() {
      this.loading = true;
      const resp = await ApiGetReviewTodoList();
      this.loading = false;
      if (resp.code === 0) {
        this.taskData = resp.result.task;
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
        name: "TodoDetailView",
        params: {
          id: item.id
        }
      });
    },
    handleUpdate({ visible }) {
      this.visible = visible;
    },
    async handleDelete(item) {
      const { id } = item;
      const resp = await ApiDeleteTodoToRecycle(id);
      if (resp.code === 0) {
        this.$toast.success("删除成功");
        this.todoList = this.todoList.filter(todo => todo.id !== id);
      }
    }
  },
  mounted() {
    this.getReviewTodoList();
  },
  render() {
    const { todoList, taskData, loading } = this.$data;

    return (
      <EContainer>
        <EHeader title={this.$route.meta.title} type="menu" />
        <EAside />
        <EContent>
          <div class={styles.reviewHeader}>
            <div class={styles.rateBox}>
              <van-rate
                value={taskData.rate}
                color="#f5222d"
                allowHalf={true}
              />
            </div>
            <div class={styles.reviewBox}>
              <div class={styles.reviewBoxItem}>
                本周完成：<span>{taskData.finishCount}</span>
              </div>
              <div class={styles.reviewBoxItem}>
                本周评分：{taskData.rate && <span>{taskData.rate}星</span>}
              </div>
              <div class={styles.reviewBoxItem}>
                本周效率：{taskData.rate && <span>{this.ratioText}</span>}
              </div>
            </div>
          </div>
          <van-divider class="divider">完成任务</van-divider>
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
