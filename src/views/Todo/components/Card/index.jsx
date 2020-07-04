import styles from "./index.less";
import classNames from "classnames";

export default {
  name: "TodoCard",
  props: {
    todoList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    undoList() {
      const { todoList } = this.$props;
      return todoList;
    },
    finishList() {
      const { todoList } = this.$props;
      return todoList;
    }
  },
  methods: {
    handleToggleCheck(item) {
      item.isFinished = !item.isFinished;
    }
  },
  render() {
    return (
      <section class={styles.cardWrapper}>
        {this.undoList.map(item => (
          <div class={styles.cardContent} key={item.id}>
            <div
              class={classNames(styles.cardInfo, {
                [styles.finished]: item.isFinished
              })}
            >
              <span
                class={styles.cardCheck}
                onClick={() => this.handleToggleCheck(item)}
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
      </section>
    );
  }
};
