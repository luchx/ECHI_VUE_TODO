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
  render() {
    const { todoList } = this.$props;
    return (
      <section class={styles.cardWrapper}>
        {todoList.map(item => (
          <div class={styles.cardContent} key={item.id}>
            <div
              class={classNames(styles.cardInfo, {
                [styles.finished]: item.status === 1
              })}
            >
              <span class={styles.cardCheck}>
                <i
                  class={classNames("iconfont", styles.icon)}
                  domPropsInnerHTML={
                    item.status === 1 ? "&#xe606;" : "&#xe6ca;"
                  }
                ></i>
              </span>
              <p class={styles.cardText}>{item.title}</p>
            </div>
            <div class={styles.cardClaim}>
              <i class={classNames("iconfont", styles.icon)}>&#xe611;</i>
              <span>{item.date}</span>
            </div>
          </div>
        ))}
      </section>
    );
  }
};
