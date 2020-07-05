import styles from "./index.module.less";
import classNames from "classnames";

export default {
  name: "TodoCard",
  props: {
    todoList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleToggleCheck(event, item) {
      event.stopPropagation();
      item.isFinished = !item.isFinished;
      this.$emit("check", item);
    },
    goDetail(item) {
      this.$emit("goDetail", item);
    },
    handleBeforeClose(event, item) {
      const { position, instance } = event;
      switch (position) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          this.$dialog
            .confirm({
              message: "确定删除吗？"
            })
            .then(() => {
              instance.close();
              this.$emit("del", item);
            });
          break;
      }
    }
  },
  render() {
    const { todoList } = this.$props;

    return (
      <transition-group name="list" tag="section" class={styles.cardWrapper}>
        {todoList.map(item => (
          <van-swipe-cell
            key={item.id}
            beforeClose={event => this.handleBeforeClose(event, item)}
          >
            <van-button
              slot="right"
              style={{ height: "100%" }}
              square
              text="删除"
              type="danger"
              class="delete-button"
            />
            <div class={styles.cardContent} onClick={() => this.goDetail(item)}>
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
                    domPropsInnerHTML={
                      item.isFinished ? "&#xe606;" : "&#xe6ca;"
                    }
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
          </van-swipe-cell>
        ))}
      </transition-group>
    );
  }
};
