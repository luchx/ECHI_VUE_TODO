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
      default: +new Date()
    }
  },
  emits: ["showMore", "updateDate"],
  setup(props, { emit }) {
    const { ctx } = getCurrentInstance() as any;

    function handleShowCalender() {
      emit("showMore");
    }

    function handleChangeDate(date) {
      emit("updateDate", date);
    }

    return () => (
      <div class={styles.dateBox}>
        <div class={styles.dateBoxContent}>
          {props.weekDate.map((date, index) => {
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
          {props.weekDate.map((date: any) => {
            return (
              <div
                class={classNames(styles.dayBoxItem, {
                  [styles.active]: ctx.$moment(date).isSame(props.currentDate, "day")
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
    )
  },
});
