import styles from "./index.module.less";
import classNames from "classnames";
import { ApiGetTodoDetail } from "@/api/todo";
import { ApiSaveTodoList } from "./../../api/todo";

export default {
  name: "TodoDetail",
  data() {
    return {
      id: null,
      statusVisible: false,
      statusData: {},
      statusOptions: [
        {
          name: "低优先级",
          key: 1,
          color: "#1890ff",
        },
        {
          name: "中优先级",
          key: 2,
          color: "#52c41a",
        },
        {
          name: "高优先级",
          key: 3,
          color: "#faad14",
        },
        {
          name: "最高优先级",
          key: 4,
          color: "#f5222d",
        },
      ],
      currentDate: new Date(),
      visibleDate: false,
      todoData: {},
      title: "",
      description: "",
      date: +new Date(),
      priority: null,
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
          this.statusOptions.find((item) => item.key === data.priority) || {};
      }
    },
    handleToggleCheck(item) {
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
        priority: this.priority,
      };

      if (this.id) {
        data["id"] = this.id;
      }
      console.log(data);
      const resp = await ApiSaveTodoList(data);
      if (resp.code === 0) {
        this.$toast.success("提交成功");
        setTimeout(() => {
          this.$router.replace({
            name: "Todo",
          });
        }, 1500);
      }
    },
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
      statusOptions,
      currentDate,
      visibleDate,
      todoData,
      id,
      title,
      description,
      date,
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
                    color: statusData.color,
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
                    {this.$moment(date).calendar(null, {
                      sameElse: "MM-DD HH:mm",
                    })}
                  </span>
                </div>
              </div>
            </div>
            <van-divider />
            <div
              class={classNames(styles.todoDetailTitle, {
                [styles.finished]: todoData.isFinished,
              })}
            >
              {id && (
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
              )}
              <van-field
                class={classNames(styles.todoDetailInput)}
                value={title}
                onInput={(value) => (this.$data.title = value)}
                placeholder="标题"
                style={{
                  paddingLeft: id ? "" : 0,
                }}
              />
            </div>
            <van-field
              class={classNames(styles.todoDetailInput, styles.textarea)}
              value={description}
              onInput={(value) => (this.$data.description = value)}
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
          actions={statusOptions}
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
  },
};
