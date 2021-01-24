import styles from "./index.module.less";
import classNames from "classnames";

export default {
  name: "TodoCard",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    // 列表数据
    todoList: {
      type: Array,
      default: () => [],
    },
    // 是否处于回收站
    recycle: {
      type: Boolean,
      default: false,
    },
    // 是否展示复选项
    showCheck: {
      type: Boolean,
      default: true,
    },
    isReadonly: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleToggleCheck(event, item) {
      if (this.isReadonly) return;
      event.stopPropagation();
      item.status = item.status === 1 ? 2 : 1;
      this.$emit("check", item);
    },
    goDetail(item) {
      this.$emit("goDetail", item);
    },
    handleDelete(item) {
      const { recycle } = this.$props;
      this.$dialog
        .confirm({
          message: recycle ? "确认彻底删除此记录?" : "确定删除吗?",
        })
        .then(() => {
          this.$emit("del", item);
        });
    },
    handleRestore(item) {
      this.$emit("restore", item);
    },
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
        {todoList.map((item) => (
          <van-swipe-cell class={styles.cardCell} key={item.id}>
            <div slot="right" style={{ height: "100%" }}>
              {recycle && (
                <EButton
                  style={{ height: "100%" }}
                  square
                  type="primary"
                  onClick={() => this.handleRestore(item)}
                >
                  还原
                </EButton>
              )}
              <EButton
                style={{ height: "100%" }}
                square
                type="danger"
                onClick={() => this.handleDelete(item)}
              >
                删除
              </EButton>
            </div>
            <div
              class={classNames(styles.cardContent, {
                [styles.finished]: item.status === 2,
              })}
              onClick={() => this.goDetail(item)}
            >
              <div class={styles.cardInfo}>
                {!recycle && showCheck && (
                  <span
                    class={styles.cardCheck}
                    onClick={(event) => this.handleToggleCheck(event, item)}
                  >
                    <i
                      class={classNames("iconfont", styles.icon)}
                      domPropsInnerHTML={
                        item.status === 2 ? "&#xe606;" : "&#xe6ca;"
                      }
                    ></i>
                  </span>
                )}
                <p class={styles.cardText}>{item.title}</p>
              </div>
              <div
                class={classNames(styles.cardClaim, {
                  [styles.recycle]: recycle || !showCheck,
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
                    sameElse: "MM-DD HH:mm",
                  })}
                </span>
              </div>
            </div>
          </van-swipe-cell>
        ))}
      </transition-group>
    );
  },
};
