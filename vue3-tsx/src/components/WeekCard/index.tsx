import { defineComponent, getCurrentInstance } from "vue";
import styles from "./index.module.less";
import classNames from "classnames";

export default defineComponent({
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
  setup(props, { emit }) {
    function handleShowCalender() {
      emit("showMore");
    }

    function handleChangeDate(date) {
      emit("updateDate", date);
    }
    return {
      handleShowCalender,
      handleChangeDate
    }
  },
  render() {
    const {
      handleShowCalender,
      handleChangeDate
    } = this
    const { ctx } = getCurrentInstance() as any;
    const { weekDate, currentDate } = this.$props;

    return (
      <div class={styles.dateBox}>
        <div class={styles.dateBoxContent}>
          {weekDate.map((date, index) => {
            return (
              <div class={classNames(styles.dateBoxItem)} key={index}>
                {
                  ["日", "一", "二", "三", "四", "五", "六"][
                  ctx.$moment(date).day()
                  ]
                }
              </div>
            );
          })}
        </div>
        <div class={styles.dateBoxContent}>
          {weekDate.map((date: any) => {
            return (
              <div
                class={classNames(styles.dayBoxItem, {
                  [styles.active]: ctx.$moment(date).isSame(currentDate, "day")
                })}
                onClick={() => handleChangeDate(date)}
                key={date}
              >
                <span>{ctx.$moment(date).date()}</span>
              </div>
            );
          })}
        </div>
        <div class={styles.dateBoxMore} onClick={handleShowCalender}>
          <i class="iconfont">&#xe756;</i>
        </div>
      </div>
    );
  }
});
