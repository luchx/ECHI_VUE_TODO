import styles from "./index.less";
import classNames from "classnames";

export default {
  name: "TodoCard",
  props: {
    todoList: {
      type: Array,
      default: () => []
    },
  },
  methods: {
    handleToggleCheck(event, item) {
      event.stopPropagation();
      item.isFinished = !item.isFinished;
      this.$emit("check", item);
    },
    goDetail(event, item) {
      this.$emit("goDetail", event, item);
    }
  },
  render() {
    const { todoList } = this.$props;

    return (
      <transition-group name="list" tag="section" class={styles.cardWrapper}>
        {todoList.map(item => (
          <div
            class={styles.cardContent}
            key={item.id}
            onClick={event => this.goDetail(event, item)}
          >
            <div
              class={classNames(styles.cardInfo, {
                [styles.finished]: item.isFinished
              })}
            >
              <span
                class={styles.cardCheck}
                onClick={event => this.handleToggleCheck(event, item)}
              >
                <i
                  class={classNames("iconfont", styles.icon)}
                  domPropsInnerHTML={item.isFinished ? "&#xe606;" : "&#xe6ca;"}
                ></i>
              </span>
              <p
                class={classNames(styles.cardText, {
                  [styles.line]: item.isFinished
                })}
              >
                {item.title}
              </p>
            </div>
            <div class={styles.cardClaim}>
              <i class={classNames("iconfont", styles.icon)}>&#xe611;</i>
              <span>{this.$moment(item.date).calendar()}</span>
            </div>
          </div>
        ))}
      </transition-group>
    );
  }
};
