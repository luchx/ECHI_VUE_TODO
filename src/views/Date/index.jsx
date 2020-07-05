import styles from "./index.module.less";

export default {
  name: "Date",
  data() {
    return {
      showCalender: false,
      weekDate: [],
      currentDate: new Date().getTime(),
      todoList: []
    };
  },
  methods: {
    formatDate(timeStamp) {
      let weekDate = []; // 日期周期
      let num = 7; // 循环次数
      let dayAdd = 0; // 当前天数
      // 获取当前星期几
      const currentDay = this.$moment(timeStamp).day();
      let minusNum = currentDay;
      let addNum = num - currentDay;
      let dayMinus = 1;
      while (minusNum--) {
        let addDay = 86400000 * dayMinus; // 当前时间跨度(86400000为一天的间隔)
        weekDate.unshift(timeStamp - addDay);
        dayMinus++;
      }
      while (addNum--) {
        let addDay = 86400000 * dayAdd; // 当前时间跨度(86400000为一天的间隔)
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
    getTodoList() {
      this.todoList = [
        {
          id: 1,
          title: "这是一段描述文字",
          description: "这是一段描述文字",
          date: "2020-07-04 15:06",
          status: 1,
          isFinished: true
        },
        {
          id: 2,
          title: "这是一段描述文字",
          description: "这是一段描述文字",
          date: "2020-08-03 11:28",
          status: 2,
          isFinished: false
        },
        {
          id: 3,
          title: "这是一段描述文字这是一段描述文字这是一段描述文字",
          description: "这是一段描述文字",
          date: "2020-03-03 19:11",
          status: 2,
          isFinished: false
        },
        {
          id: 4,
          title: "这是一段描述文字这是一段描述文字这是一段描述文字",
          description: "这是一段描述文字",
          date: "2020-07-04 19:11",
          status: 2,
          isFinished: false
        }
      ].sort((a, b) => {
        return b.status - a.status;
      });
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
        name: "TodoDetail",
        params: {
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
      const times = new Date(value).getTime();
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
    },
    handleUpdateValue(date) {
      this.currentDate = date;
    }
  },
  mounted() {
    this.getTodoList();
    const today = this.currentDate;
    this.formatDate(today);
  },
  render() {
    const { showCalender, weekDate, currentDate, todoList } = this.$data;

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
            formatter={this.formatterCalender}
            onSelect={this.handleConfirmCalender}
            color="#1890ff"
          />
          <ETodoCard
            todoList={todoList}
            onCheck={this.handleCheck}
            onGoDetail={this.handleGoDetail}
          />
        </EContent>
        <EFooter />
      </EContainer>
    );
  }
};
