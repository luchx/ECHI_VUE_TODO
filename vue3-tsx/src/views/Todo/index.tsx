import { defineComponent, onMounted, reactive } from "vue";
import { ApiGetTodoList, ApiDeleteTodoToRecycle, ApiToggleFinishTodo } from "/@/api/todo";
import EContainer from '/@/components/Container';
import EHeader from '/@/components/Header';
import EContent from '/@/components/Content';
import EAside from '/@/components/Aside';
import EFooter from '/@/components/Footer';
import ETodoCard from '/@/components/TodoCard/index.vue';
import styles from "./index.module.less";
import { useRouter, useRoute, RouterLink } from 'vue-router';
import { Button, Toast } from 'vant';

interface TodoState {
  currentPage: number;
  pageSize: number;
  total: number;
  todoList: any[];
  loading: boolean;
}

export default defineComponent({
  name: "Todo",
  setup() {
    const router = useRouter();
    const route = useRoute();

    const state = reactive<TodoState>({
      currentPage: 1,
      pageSize: 10,
      total: 0,
      todoList: [],
      loading: false
    })

    async function getTodoList(page = 1, pageSize = 10) {
      if (state.loading) return;
      state.loading = true;
      state.currentPage = page;
      state.pageSize = pageSize;
      const data = {
        page,
        pageSize
      };
      const resp = await ApiGetTodoList(data);
      state.loading = false;
      if (resp.code === 0) {
        const { list, pagination } = resp.result;
        const { total } = pagination;
        state.todoList = list;
        state.total = total;
      }
    }

    async function handleCheck(item) {
      const { id, status } = item;
      const resp = await ApiToggleFinishTodo(id, status);
      if (resp.code === 0) {
        Toast.success(resp.message);
        state.todoList = state.todoList.filter(todo => todo.id !== id);
      }
    }

    function handleGoDetail(item) {
      router.push({
        name: "TodoDetail",
        query: {
          id: item.id
        }
      });
    }

    async function handleDelete(item) {
      const { id } = item;
      const resp = await ApiDeleteTodoToRecycle(id);
      if (resp.code === 0) {
        Toast("删除成功");
        state.todoList = state.todoList.filter(todo => todo.id !== id);
      }
    }

    onMounted(() => {
      getTodoList()
    });

    return {
      state,
      route,
      handleCheck, 
      handleGoDetail, 
      handleDelete
    }
  },
  render() {
    const { state, route, handleCheck, handleGoDetail, handleDelete } = this;
    const { todoList, loading } = state;

    return (
      <EContainer>
        <EHeader
          title={route.meta.title}
          type="menu"
          extra={
            <RouterLink
              to={{
                name: "TodoDetail"
              }}
            >
              <Button plain type="primary" class={styles.addBtn}>
                新增
              </Button>
            </RouterLink>
          }
        />
        <EAside />
        <EContent>
          <ETodoCard
            loading={loading}
            todoList={todoList}
            onCheck={handleCheck}
            onGoDetail={handleGoDetail}
            onDel={handleDelete}
          />
        </EContent>
        <EFooter />
      </EContainer>
    );
  }
});
