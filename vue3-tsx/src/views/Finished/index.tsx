import styles from "./index.module.less";
import { ApiGetFinishedTodoList, ApiDeleteTodoToRecycle } from "/@/api/todo";
import { defineComponent } from 'vue';
import EContainer from '/@/components/Container';
import EHeader from '/@/components/Header';
import EContent from '/@/components/Content';
import EAside from '/@/components/Aside';
import ETodoCard from '/@/components/TodoCard/index.vue';
import { Divider } from 'vant';

export default defineComponent({
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
        list.forEach(item => {
          const key = this.$moment(item.date).format("YYYY-MM-DD");
          if (this.todoData[key] === undefined) {
            this.todoData[key] = [];
          }
          this.todoData[key].push(item);
        });
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
        this.$toast.success(resp.message);
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
          {Object.keys(todoData).map(date => (
            <div>
              <div class={styles.titleBar}>
                <Divider class="divider">{date}</Divider>
              </div>
              <ETodoCard
                isReadonly
                loading={loading}
                todoList={todoData[date]}
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
      </EContainer>
    );
  }
});
