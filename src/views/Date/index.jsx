import styles from "./index.module.less";
import { ApiGetTodoList } from "@/api/todo";

export default {
  name: "Date",
  data() {
    return {
      showCalender: false,
      weekDate: [],
      currentDate: new Date().getTime(),
      todoList: [],
      loading: false,
    };
  },
  methods: {
    formatDate(timeStamp) {
      const weekDate = []; // 日期周期
      const num = 7; // 循环次数
      let dayAdd = 0; // 当前天数
      // 获取当前星期几
      const currentDay = this.$moment(timeStamp).day();
      let minusNum = currentDay;
      let addNum = num - currentDay;
      let dayMinus = 1;
      while (minusNum--) {
        const addDay = 86400000 * dayMinus; // 当前时间跨度(86400000为一天的间隔)
        weekDate.unshift(timeStamp - addDay);
        dayMinus++;
      }
      while (addNum--) {
        const addDay = 86400000 * dayAdd; // 当前时间跨度(86400000为一天的间隔)
        weekDate.push(timeStamp + addDay);
        dayAdd++;
      }
      this.weekDate = weekDate;
    },
    formatterCalender(day) {
      const isTodo = this.$moment(this.currentDate).isSame(day.date, "day");
      if (isTodo) {
        day.bottomInfo = "待办";
      }

      return day;
    },
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
    handleShowCalender() {
      this.showCalender = true;
    },
    handleCloseCalender() {
      this.showCalender = false;
    },
    handleConfirmCalender(value) {
      const times = new Date(value).getTime();
      const date = this.weekDate.find((date) =>
        this.$moment(date).isSame(value, "day")
      );
      if (!date) {
        this.currentDate = times;
        this.formatDate(times);
      } else {
        this.currentDate = date;
      }

      this.handleCloseCalender();
    },
    handleUpdateValue(date) {
      this.currentDate = date;
    },
  },
  mounted() {
    this.getTodoList();
    const today = this.currentDate;
    this.formatDate(today);
  },
  render() {
    const {
      showCalender,
      weekDate,
      currentDate,
      todoList,
      loading,
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
          />
        </EContent>
        <EFooter />
      </EContainer>
    );
  },
};
