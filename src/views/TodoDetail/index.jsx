import styles from "./index.less";
import classNames from "classnames";

export default {
  name: "TodoDetail",
  props: {
    todo: {
      type: Object,
      default: () => {},
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleBack() {
      this.$router.back();
      this.$emit("update", {
        visible: false,
      });
    },
    handleToggleCheck(event, item) {
      event.stopPropagation();
      item.isFinished = !item.isFinished;
    },
  },
  render() {
    const { visible, todo } = this.$props;

    return (
      visible && (
        <EContainer class={styles.todoDetail}>
          <EHeader
            goBack={this.handleBack}
            extra={<span class={styles.saveBtn}>保存</span>}
          />
          <EContent class={styles.todoDetailContent}>
            <div
              class={classNames(styles.cardInfo, {
                [styles.finished]: todo.isFinished,
              })}
            >
              <span
                class={styles.cardCheck}
                onClick={(event) => this.handleToggleCheck(event, todo)}
              >
                <i
                  class={classNames("iconfont", styles.icon)}
                  domPropsInnerHTML={todo.isFinished ? "&#xe606;" : "&#xe6ca;"}
                ></i>
              </span>
              <input class={classNames(styles.cardInput)} value={todo.title} />
            </div>
            <div class={styles.cardClaim}>
              <i class={classNames("iconfont", styles.icon)}>&#xe611;</i>
              <span>{this.$moment(todo.date).calendar()}</span>
            </div>
          </EContent>
        </EContainer>
      )
    );
  },
};
