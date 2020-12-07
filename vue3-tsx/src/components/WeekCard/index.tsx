import { defineComponent, PropType } from "vue";
import moment from "moment";
import styles from "./index.module.less";
import classNames from "classnames";

export default defineComponent({
  name: "WeekCard",
  props: {
    weekDate: {
      type: Array as PropType<Array<number>>,
      default: () => []
    },
    currentDate: {
      type: Number,
      default: +new Date()
    }
  },
  emits: ["showMore", "updateDate"],
  setup(props, { emit }) {
    function handleShowCalender() {
      emit("showMore");
    }

    function handleChangeDate(date) {
      emit("updateDate", date);
    }

    return () => (
      <div class={styles.dateBox}>
        <div class={styles.dateBoxContent}>
          {props.weekDate.map((date: number, index) => {
            return (
              <div class={classNames(styles.dateBoxItem)} key={index}>
                {
                  ["日", "一", "二", "三", "四", "五", "六"][
                  moment(date).day()
                  ]
                }
              </div>
            );
          })}
        </div>
        <div class={styles.dateBoxContent}>
          {props.weekDate.map((date: number) => {
            return (
              <div
                class={classNames(styles.dayBoxItem, {
                  [styles.active]: moment(date).isSame(props.currentDate, "day")
                })}
                onClick={() => handleChangeDate(date)}
                key={date}
              >
                <span>{moment(date).date()}</span>
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
