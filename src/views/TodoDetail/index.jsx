import styles from "./index.module.less";
import classNames from "classnames";

export default {
  name: "TodoDetail",
  data() {
    return {
      currentDate: new Date(),
      visibleDate: false,
      todoData: {
        id: 3,
        title: "这是一段描述文字这是一段描述文字这是一段描述文字",
        description: "这是一段描述文字",
        date: "2020-03-03 19:11",
        status: 2,
        isFinished: false
      }
    };
  },
  methods: {
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
      this.todoData.date = this.$moment(value);
      this.handleCloseDate();
    }
  },
  render() {
    const { currentDate, visibleDate, todoData } = this.$data;

    return (
      <EContainer class={classNames(styles.todoDetail)}>
        <EHeader
          extra={
            <van-button plain type="primary" class={styles.saveBtn}>
              保存
            </van-button>
          }
        />
        <EContent class={styles.todoDetailContent}>
          <div
            class={classNames(styles.todoDetailTitle, {
              [styles.finished]: todoData.isFinished
            })}
          >
            <span
              class={styles.todoDetailCheck}
              onClick={() => this.handleToggleCheck(todoData)}
            >
              <i
                class={classNames("iconfont", styles.icon)}
                domPropsInnerHTML={
                  todoData.isFinished ? "&#xe606;" : "&#xe6ca;"
                }
              ></i>
            </span>
            <van-field
              class={classNames(styles.todoDetailInput)}
              value={todoData.title}
              placeholder="标题"
            />
          </div>
          <van-divider />
          <van-field
            class={classNames(styles.todoDetailInput)}
            value={todoData.description}
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
            <span>{this.$moment(todoData.date).calendar()}</span>
          </div>
        </EContent>
        <van-popup
          value={visibleDate}
          onInput={this.handleCloseDate}
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
    );
  }
};
