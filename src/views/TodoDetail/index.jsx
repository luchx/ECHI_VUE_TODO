import styles from "./index.module.less";
import classNames from "classnames";

export default {
  name: "TodoDetail",
  props: {
    todo: {
      type: Object,
      default: () => {}
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentDate: new Date(),
      visibleDate: false
    };
  },
  methods: {
    handleBack() {
      this.$router.back();
      this.$emit("update", {
        visible: false
      });
    },
    handleToggleCheck(event, item) {
      event.stopPropagation();
      item.isFinished = !item.isFinished;
    },
    handleOpenDate() {
      this.visibleDate = true;
    },
    handleCloseDate() {
      this.visibleDate = false;
    },
    handleConfirmDate(value) {
      console.log(value);
      this.todo.date = this.$moment(value);
      this.handleCloseDate();
    }
  },
  render() {
    const { visible, todo } = this.$props;
    const { currentDate, visibleDate } = this.$data;

    return (
      visible && (
        <EContainer class={classNames(styles.todoDetail)}>
          <EHeader
            goBack={this.handleBack}
            extra={
              <van-button plain type="primary" class={styles.saveBtn}>
                保存
              </van-button>
            }
          />
          <EContent class={styles.todoDetailContent}>
            <div
              class={classNames(styles.todoDetailTitle, {
                [styles.finished]: todo.isFinished
              })}
            >
              <span
                class={styles.todoDetailCheck}
                onClick={event => this.handleToggleCheck(event, todo)}
              >
                <i
                  class={classNames("iconfont", styles.icon)}
                  domPropsInnerHTML={todo.isFinished ? "&#xe606;" : "&#xe6ca;"}
                ></i>
              </span>
              <van-field
                class={classNames(styles.todoDetailInput)}
                value={todo.title}
                placeholder="标题"
              />
            </div>
            <van-divider />
            <van-field
              class={classNames(styles.todoDetailInput)}
              value={todo.description}
              showWordLimit={true}
              maxlength="200"
              type="textarea"
              rows="10"
              autosize
              placeholder="记录你的美好123"
            />
            <van-divider />
            <div class={styles.todoDetailClaim} onClick={this.handleOpenDate}>
              <i class={classNames("iconfont", styles.icon)}>&#xe611;</i>
              <span>{this.$moment(todo.date).calendar()}</span>
            </div>
          </EContent>
          <van-popup
            value={visibleDate}
            closeOnClickOverlay={false}
            position="bottom"
          >
            <van-datetime-picker
              onCancel={this.handleCloseDate}
              onConfirm={this.handleConfirmDate}
              value={currentDate}
              type="datetime"
              title="选择完整时间"
            />
          </van-popup>
        </EContainer>
      )
    );
  }
};
