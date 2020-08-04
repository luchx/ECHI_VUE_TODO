import styles from "./index.module.less";
import classNames from "classnames";

export default {
  name: "TodoCard",
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    // 列表数据
    todoList: {
      type: Array,
      default: () => []
    },
    // 是否处于回收站
    recycle: {
      type: Boolean,
      default: false
    },
    // 是否展示复选项
    showCheck: {
      type: Boolean,
      default: true
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
    handleDelete(item) {
      const { recycle } = this.$props;
      this.$dialog
        .confirm({
          message: recycle ? "确认彻底删除此记录?" : "确定删除吗?"
        })
        .then(() => {
          this.$emit("del", item);
        });
    },
    handleRestore(item) {
      this.$emit("restore", item);
    }
  },
  render() {
    const { todoList, recycle, showCheck, loading } = this.$props;

    if (loading) {
      return <ECardSkeleton loading={loading} />;
    }

    if (todoList.length === 0 && !loading) {
      return <EEmpty />;
    }

    return (
      <transition-group name="list" tag="section" class={styles.cardWrapper}>
        {todoList.map(item => (
          <van-swipe-cell class={styles.cardCell} key={item.id}>
            <div slot="right" style={{ height: "100%" }}>
              {recycle && (
                <van-button
                  style={{ height: "100%" }}
                  square
                  text="还原"
                  type="primary"
                  onClick={() => this.handleRestore(item)}
                />
              )}
              <van-button
                style={{ height: "100%" }}
                square
                text="删除"
                type="danger"
                onClick={() => this.handleDelete(item)}
              />
            </div>
            <div
              class={classNames(styles.cardContent, {
                [styles.finished]: item.isFinished
              })}
              onClick={() => this.goDetail(item)}
            >
              <div class={styles.cardInfo}>
                {!recycle && showCheck && (
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
                )}
                <p class={styles.cardText}>{item.title}</p>
              </div>
              <div
                class={classNames(styles.cardClaim, {
                  [styles.recycle]: recycle || !showCheck
                })}
              >
                <i class={classNames("iconfont", styles.icon)}>&#xe611;</i>
                <span>
                  {this.$moment(item.date).calendar(null, {
                    sameDay: "[今天]",
                    nextDay: "[明天]",
                    nextWeek: "MM-DD HH:mm",
                    lastDay: "[昨天]",
                    lastWeek: "MM-DD HH:mm",
                    sameElse: "MM-DD HH:mm"
                  })}
                </span>
              </div>
            </div>
          </van-swipe-cell>
        ))}
      </transition-group>
    );
  }
};
