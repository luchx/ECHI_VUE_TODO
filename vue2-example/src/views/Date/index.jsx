import styles from "./index.module.less";
import {
  ApiGetTodoListByDay,
  ApiDeleteTodoToRecycle,
  ApiToggleFinishTodo,
  ApiGetTodoDate
} from "@/api/todo";
import { mapState } from "vuex";

export default {
  name: "Date",
  data() {
    return {
      showCalender: false,
      weekDate: [],
      currentDate: +new Date(),
      todoList: [],
      dateList: [],
      loading: false
    };
  },
  methods: {
    formatDate(timeStamp) {
      const weekDate = []; // 日期周期
      let count = 7; // 循环次数
      let day = 0; // 当前天数
      // 获取当前星期几
      const currentDay = this.$moment(timeStamp).day();
      const addNum = timeStamp - 86400000 * currentDay;
      while (count--) {
        const addDay = 86400000 * day; // 当前时间跨度(86400000为一天的间隔)
        weekDate.push(addNum + addDay);
        day++;
      }
      this.weekDate = weekDate;
    },
    formatterCalender(item) {
      const isTodo = this.dateList.some(date =>
        this.$moment(date).isSame(item.date, "day")
      );
      if (isTodo) {
        item.bottomInfo = "待办";
      }

      return item;
    },
    async getTodoListByDay() {
      this.loading = true;
      const date = this.$moment(this.currentDate).format("YYYY-MM-DD");
      const resp = await ApiGetTodoListByDay(date);
      this.loading = false;
      if (resp.code === 0) {
        this.todoList = resp.result;
      }
    },
    async handleCheck(item) {
      const { id, status } = item;
      const resp = await ApiToggleFinishTodo(id, status);
      if (resp.code === 0) {
        this.$toast.success(resp.message);
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
    handleShowCalender() {
      this.showCalender = true;
    },
    handleCloseCalender() {
      this.showCalender = false;
    },
    handleConfirmCalender(value) {
      const times = +new Date(value);
      const date = this.weekDate.find(date =>
        this.$moment(date).isSame(value, "day")
      );
      if (!date) {
        this.currentDate = times;
        this.formatDate(times);
      } else {
        this.currentDate = date;
      }
      this.handleCloseCalender();
      this.getTodoListByDay();
    },
    handleUpdateValue(date) {
      this.currentDate = date;
      this.getTodoListByDay();
    },
    async handleDelete(item) {
      const { id } = item;
      const resp = await ApiDeleteTodoToRecycle(id);
      if (resp.code === 0) {
        this.$toast.success("删除成功");
        this.todoList = this.todoList.filter(todo => todo.id !== id);
      }
    },
    async getTodoDate() {
      const resp = await ApiGetTodoDate();
      if (resp.code === 0) {
        this.dateList = resp.result;
      }
    }
  },
  async created() {
    this.loading = true;
    this.formatDate(this.currentDate);
    const times = await this.$store.dispatch("getTimes");
    this.currentDate = times;
    this.formatDate(times);
    this.getTodoListByDay();
    this.getTodoDate();
  },
  render() {
    const {
      showCalender,
      weekDate,
      currentDate,
      todoList,
      loading
    } = this.$data;

    return (
      <EContainer>
        <EHeader title={this.$route.meta.title} type="menu" />
        <EAside />
        <EContent>
          <EWeekCard
            weekDate={weekDate}
            currentDate={currentDate}
            onUpdateDate={this.handleUpdateValue}
            onShowMore={this.handleShowCalender}
          />
          <van-calendar
            class={styles.calender}
            value={showCalender}
            defaultDate={new Date(currentDate)}
            onInput={this.handleCloseCalender}
            round={false}
            showTitle={false}
            showConfirm={false}
            minDate={new Date(2019, 0, 1)}
            maxDate={new Date(2099, 0, 1)}
            formatter={this.formatterCalender}
            onSelect={this.handleConfirmCalender}
            color="#f5222d"
          />
          <van-divider class="divider">
            {this.$moment(currentDate).isSame(new Date(), "day")
              ? "今日任务"
              : this.$moment(currentDate).format("YYYY-MM-DD")}
          </van-divider>
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
};
