import styles from "./index.module.less";
import { ApiGetTodoListByDay, ApiDeleteTodoToRecycle, ApiGetTodoDate, ApiToggleFinishTodo } from "/@/api/todo";
import { useStore } from "vuex";
import { defineComponent, onMounted, reactive } from 'vue';
import moment from "moment";
import EContainer from '/@/components/Container';
import EHeader from '/@/components/Header';
import EContent from '/@/components/Content';
import EAside from '/@/components/Aside';
import EFooter from '/@/components/Footer';
import EWeekCard from '/@/components/WeekCard';
import ETodoCard from '/@/components/TodoCard/index.vue';
import { useRoute, useRouter } from 'vue-router';
import { Calendar, Divider, Toast } from 'vant';

interface DateState {
  showCalender: boolean;
  weekDate: number[];
  currentDate: number;
  todoList: object[];
  dateList: number[];
  loading: boolean
}

export default defineComponent({
  name: "Date",
  setup() {
    const state = reactive<DateState>({
      showCalender: false,
      weekDate: [],
      currentDate: +new Date(),
      todoList: [],
      dateList: [],
      loading: false
    })
    const store = useStore();
    const router = useRouter()
    const route = useRoute()

    function formatDate(timeStamp) {
      const weekDate: number[] = []; // 日期周期
      let count = 7; // 循环次数
      let day = 0; // 当前天数
      // 获取当前星期几
      const currentDay = moment(timeStamp).day();
      const addNum = timeStamp - 86400000 * currentDay;
      while (count--) {
        const addDay = 86400000 * day; // 当前时间跨度(86400000为一天的间隔)
        weekDate.push(addNum + addDay);
        day++;
      }
      state.weekDate = weekDate;
    }

    function formatterCalender(item) {
      const isTodo = state.dateList.some(date =>
        moment(date).isSame(item.date, "day")
      );
      if (isTodo) {
        item.bottomInfo = "待办";
      }

      return item;
    }

    async function getTodoListByDay() {
      state.loading = true;
      const date = moment(state.currentDate).format("YYYY-MM-DD");
      const resp = await ApiGetTodoListByDay(date);
      state.loading = false;
      if (resp.code === 0) {
        state.todoList = resp.result;
      }
    }

    async function handleCheck(item) {
      const { id, status } = item;
      const resp = await ApiToggleFinishTodo(id, status);
      if (resp.code === 0) {
        Toast.success(resp.message);
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

    function handleShowCalender() {
      state.showCalender = true;
    }

    function handleCloseCalender() {
      state.showCalender = false;
    }

    function handleConfirmCalender(value) {
      const times = +new Date(value);
      const date = state.weekDate.find(date =>
        moment(date).isSame(value, "day")
      );
      if (!date) {
        state.currentDate = times;
        formatDate(times);
      } else {
        state.currentDate = date;
      }
      handleCloseCalender();
      getTodoListByDay();
    }

    function handleUpdateValue(date) {
      state.currentDate = date;
      getTodoListByDay();
    }

    async function handleDelete(item) {
      const { id } = item;
      const resp = await ApiDeleteTodoToRecycle(id);
      if (resp.code === 0) {
        Toast.success("删除成功");
        state.todoList = state.todoList.filter((todo: any) => todo.id !== id);
      }
    }

    async function getTodoDate() {
      const resp = await ApiGetTodoDate();
      if (resp.code === 0) {
        state.dateList = resp.result;
      }
    }

    onMounted(async () => {
      state.loading = true;
      formatDate(state.currentDate);
      const times = await store.dispatch("getTimes");
      state.currentDate = times;
      formatDate(times);
      getTodoListByDay();
      getTodoDate();
    })

    return () => (
      <EContainer>
        <EHeader title={route.meta.title} type="menu" />
        <EAside />
        <EContent>
          <EWeekCard
            weekDate={state.weekDate}
            currentDate={state.currentDate}
            onUpdateDate={handleUpdateValue}
            onShowMore={handleShowCalender}
          />
          <Calendar
            class={styles.calender}
            show={state.showCalender}
            defaultDate={new Date(state.currentDate)}
            onInput={handleCloseCalender}
            round={false}
            showTitle={false}
            showConfirm={false}
            minDate={new Date(2019, 0, 1)}
            maxDate={new Date(2099, 0, 1)}
            formatter={formatterCalender}
            onSelect={handleConfirmCalender}
            color="#f5222d"
          />
          <Divider class="divider">
            {moment(state.currentDate).isSame(new Date(), "day")
              ? "今日任务"
              : moment(state.currentDate).format("YYYY-MM-DD")}
          </Divider>
          <ETodoCard
            loading={state.loading}
            todoList={state.todoList}
            onCheck={handleCheck}
            onGoDetail={handleGoDetail}
            onDel={handleDelete}
          />
        </EContent>
        <EFooter />
      </EContainer>
    )
  },
});
