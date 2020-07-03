import styles from "./index.less";
import classNames from "classnames";

export default {
  name: "TodoCard",
  render() {
    return (
      <section class={styles.cardWrapper}>
        <div class={styles.cardContent}>
          <div class={styles.cardInfo}>
            <span class={styles.cardCheck}>
              <i class={classNames("iconfont", styles.icon)}>&#xe6ca;</i>
            </span>
            <p class={styles.cardText}>这是一段描述文字</p>
          </div>
          <div class={styles.cardClaim}>
            <i class={classNames("iconfont", styles.icon)}>&#xe611;</i>
            <span>今天 23:14</span>
          </div>
        </div>
        <div class={styles.cardContent}>
          <div class={classNames(styles.cardInfo, styles.disabled)}>
            <span class={styles.cardCheck}>
              <i class={classNames("iconfont", styles.icon)}>&#xe606;</i>
            </span>
            <p class={styles.cardText}>这是一段描述文字</p>
          </div>
          <div class={styles.cardClaim}>
            <i class={classNames("iconfont", styles.icon)}>&#xe611;</i>
            <span>今天 23:14</span>
          </div>
        </div>
      </section>
    );
  }
};
