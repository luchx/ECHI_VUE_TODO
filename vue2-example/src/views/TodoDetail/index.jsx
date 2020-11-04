import styles from "./index.module.less";
import classNames from "classnames";
import { ApiGetTodoDetail, ApiSaveTodoList } from "@/api/todo";
import { priorityOption } from "@/utils/constant";

export default {
  name: "TodoDetail",
  data() {
    return {
      id: undefined,
      statusVisible: false,
      statusData: {},
      currentDate: new Date(),
      visibleDate: false,
      todoData: {},
      title: "",
      description: "",
      date: +new Date(),
      priority: undefined
    };
  },
  methods: {
    async getTodoDetail(id) {
      if (!id) {
        return;
      }
      this.loading = true;
      const resp = await ApiGetTodoDetail(id);
      this.loading = false;
      if (resp.code === 0) {
        const data = resp.result;
        this.todoData = data;
        this.title = data.title;
        this.description = data.description;
        this.date = data.date;
        this.priority = data.priority;
        this.statusData =
          priorityOption.find(item => item.key === data.priority) || {};
      }
    },
    handleOpenDate() {
      this.visibleDate = true;
    },
    handleCloseDate() {
      this.visibleDate = false;
    },
    handleConfirmDate(value) {
      this.date = this.$moment(value);
      this.handleCloseDate();
    },
    handleOpenStatus() {
      this.statusVisible = true;
    },
    handleCloseStatus() {
      this.statusVisible = false;
    },
    handleSelectStatus(value) {
      this.statusData = value;
      this.priority = value.key;
      this.handleCloseStatus();
    },
    async handleSave() {
      if (!this.title) {
        this.$toast("请填写标题~");
        return;
      }

      const data = {
        title: this.title,
        description: this.description,
        date: this.date,
        priority: this.priority
      };

      if (this.id) {
        data["id"] = this.id;
      }
      const resp = await ApiSaveTodoList(data);
      if (resp.code === 0) {
        this.$toast.success("提交成功");
        setTimeout(() => {
          this.$router.replace({
            name: "Todo"
          });
        }, 1500);
      }
    }
  },
  mounted() {
    const { id } = this.$route.query;
    this.id = id;
    this.getTodoDetail(id);
  },
  render() {
    const {
      statusVisible,
      statusData,
      currentDate,
      visibleDate,
      todoData,
      id,
      title,
      description,
      date
    } = this.$data;

    return (
      <EContainer class={classNames(styles.todoDetail)}>
        <EHeader
          extra={
            <van-button
              plain
              type="info"
              class={styles.saveBtn}
              onClick={this.handleSave}
            >
              保存
            </van-button>
          }
        />
        <EContent>
          <div class={styles.todoDetailContent}>
            <div class={styles.todoDetailHeader}>
              <div
                class={styles.todoDetailHeaderItem}
                onClick={this.handleOpenStatus}
              >
                <span
                  style={{
                    color: statusData.color
                  }}
                >
                  {statusData.name || "优先级"}
                </span>
              </div>
              <div class={styles.todoDetailHeaderItem}>
                <div
                  class={styles.todoDetailClaim}
                  onClick={this.handleOpenDate}
                >
                  <i class={classNames("iconfont", styles.icon)}>&#xe668;</i>
                  <span>
                    {this.$moment(date).calendar(undefined, {
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
            </div>
            <van-divider />
            <div
              class={classNames(styles.todoDetailTitle, {
                [styles.finished]: todoData.status === 2
              })}
            >
              {id && (
                <span class={styles.todoDetailCheck}>
                  <i
                    class={classNames("iconfont", styles.icon)}
                    domPropsInnerHTML={
                      todoData.status === 2 ? "&#xe606;" : "&#xe6ca;"
                    }
                  ></i>
                </span>
              )}
              <van-field
                class={classNames(styles.todoDetailInput)}
                value={title}
                onInput={value => (this.$data.title = value)}
                placeholder="标题"
                style={{
                  paddingLeft: id ? "" : 0
                }}
              />
            </div>
            <van-field
              class={classNames(styles.todoDetailInput, styles.textarea)}
              value={description}
              onInput={value => (this.$data.description = value)}
              showWordLimit={true}
              maxlength="200"
              type="textarea"
              rows="10"
              autosize
              placeholder="记录你的美好"
            />
          </div>
        </EContent>
        <van-action-sheet
          value={statusVisible}
          onInput={this.handleCloseStatus}
          actions={priorityOption}
          round={false}
          onSelect={this.handleSelectStatus}
        />
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
