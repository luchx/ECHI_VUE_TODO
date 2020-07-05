import styles from "./index.module.less";
import classNames from "classnames";

export default {
  name: "Date",
  data() {
    return {
      showCalender: false,
      weekDate: [],
      activeIndex: 0,
      todoList: []
    };
  },
  methods: {
    formatDate(timeStamp) {
      let weekDate = []; // 日期周期
      let num = 7; // 循环次数
      let day = 0; // 当前天数
      while (num--) {
        let addDay = 86400000 * day; // 当前时间跨度(86400000为一天的间隔)
        weekDate.push(timeStamp + addDay);
        day++;
      }
      this.weekDate = weekDate;
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
    }
  },
  mounted() {
    this.getTodoList();
    const today = new Date().getTime();
    this.formatDate(today);
  },
  render() {
    const { showCalender, weekDate, activeIndex, todoList } = this.$data;

    return (
      <EContainer>
        <EHeader title={this.$route.meta.title} type="menu" />
        <EAside />
        <EContent>
          <div class={styles.dateBox}>
            <div class={styles.dateBoxContent}>
              {weekDate.map((item, index) => {
                return (
                  <div class={classNames(styles.dateBoxItem)} key={index}>
                    {
                      ["日", "一", "二", "三", "四", "五", "六"][
                        this.$moment(item).day()
                      ]
                    }
                  </div>
                );
              })}
            </div>
            <div class={styles.dateBoxContent}>
              {weekDate.map((item, index) => {
                return (
                  <div
                    class={classNames(styles.dayBoxItem, {
                      [styles.active]: index === activeIndex
                    })}
                    key={index}
                  >
                    <span>{this.$moment(item).date()}</span>
                  </div>
                );
              })}
            </div>
            <div class={styles.dateBoxMore}>
              <i class="iconfont">&#xe756;</i>
            </div>
          </div>
          <van-calendar value={showCalender} round={false} position="right" />
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
