import styles from "./index.module.less";
import classNames from "classnames";

export default {
  name: "WeekCard",
  props: {
    weekDate: {
      type: Array,
      default: () => []
    },
    currentDate: {
      type: Number,
      default: new Date().getTime()
    }
  },
  methods: {
    handleShowCalender() {
      this.$emit("showMore");
    },
    handleChangeDate(date) {
      this.$emit("updateDate", date);
    }
  },
  render() {
    const { weekDate, currentDate } = this.$props;

    return (
      <div class={styles.dateBox}>
        <div class={styles.dateBoxContent}>
          {weekDate.map((date, index) => {
            return (
              <div class={classNames(styles.dateBoxItem)} key={index}>
                {
                  ["日", "一", "二", "三", "四", "五", "六"][
                    this.$moment(date).day()
                  ]
                }
              </div>
            );
          })}
        </div>
        <div class={styles.dateBoxContent}>
          {weekDate.map(date => {
            return (
              <div
                class={classNames(styles.dayBoxItem, {
                  [styles.active]: this.$moment(date).isSame(currentDate, "day")
                })}
                onClick={() => this.handleChangeDate(date)}
                key={date}
              >
                <span>{this.$moment(date).date()}</span>
              </div>
            );
          })}
        </div>
        <div class={styles.dateBoxMore} onClick={this.handleShowCalender}>
          <i class="iconfont">&#xe756;</i>
        </div>
      </div>
    );
  }
};
