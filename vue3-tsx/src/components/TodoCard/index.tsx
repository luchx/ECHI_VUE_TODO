import { defineComponent, getCurrentInstance, TransitionGroup } from 'vue';
import styles from "./index.module.less";
import classNames from "classnames";
import ECardSkeleton from '/@/components/CardSkeleton';
import EEmpty from '/@/components/Empty';
import { Button, Dialog, SwipeCell } from 'vant';

export default defineComponent({
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
  setup(props, { emit }) {
    function handleToggleCheck(event, item) {
      event.stopPropagation();
      item.isFinished = !item.isFinished;
      emit("check", item);
    }

    function goDetail(item) {
      emit("goDetail", item);
    }

    function handleDelete(item) {
      const { recycle } = props;
      Dialog
        .confirm({
          message: recycle ? "确认彻底删除此记录?" : "确定删除吗?"
        })
        .then(() => {
          emit("del", item);
        });
    }

    function handleRestore(item) {
      emit("restore", item);
    }

    return {
      handleToggleCheck,
      goDetail,
      handleDelete,
      handleRestore
    }
  },
  render() {
    const {
      handleToggleCheck,
      goDetail,
      handleDelete,
      handleRestore
    } = this;
    const { ctx } = getCurrentInstance() as any;
    const { todoList, recycle, showCheck, loading } = this.$props;

    if (loading) {
      return <ECardSkeleton loading={loading} />;
    }

    if (todoList.length === 0 && !loading) {
      return <EEmpty />;
    }

    return (
      <TransitionGroup name="list" tag="section" class={styles.cardWrapper}>
        {todoList.map((item: any) => (
          <SwipeCell class={styles.cardCell} key={item.id} v-slots={{
            default: () => (
              <div
                class={classNames(styles.cardContent, {
                  [styles.finished]: item.status === 2
                })}
                onClick={() => goDetail(item)}
              >
                <div class={styles.cardInfo}>
                  {!recycle && showCheck && (
                    <span
                      class={styles.cardCheck}
                      onClick={event => handleToggleCheck(event, item)}
                    >
                      {item.status === 2 ? (<i class={classNames("iconfont", styles.icon)}>&#xe606;</i>) : (<i class={classNames("iconfont", styles.icon)}>&#xe6ca;</i>)}
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
                    {ctx.$moment(item.date).calendar(null, {
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
            )
          }}>
            <div style={{ height: "100%" }}>
              {recycle && (
                <Button
                  style={{ height: "100%" }}
                  square
                  text="还原"
                  type="primary"
                  onClick={() => handleRestore(item)}
                />
              )}
              <Button
                style={{ height: "100%" }}
                square
                text="删除"
                type="danger"
                onClick={() => handleDelete(item)}
              />
            </div>

          </SwipeCell>
        ))}
      </TransitionGroup>
    );
  }
});
