import styles from "./index.module.less";
import classNames from "classnames";
import { ApiGetTodoDetail } from "@/api/todo";

export default {
  name: "TodoDetail",
  data() {
    return {
      statusData: {},
      statusOptions: [
        {
          name: "低优先级",
          key: "low",
          color: "#1890ff"
        },
        {
          name: "中优先级",
          key: "middle",
          color: "#52c41a"
        },
        {
          name: "高优先级",
          key: "height",
          color: "#faad14"
        },
        {
          name: "最高优先级",
          key: "heightest",
          color: "#f5222d"
        }
      ],
      currentDate: new Date(),
      todoData: {}
    };
  },
  methods: {
    async getTodoDetail(id) {
      this.loading = true;
      const resp = await ApiGetTodoDetail(id);
      this.loading = false;
      if (resp.code === 0) {
        const data = resp.result;
        this.todoData = data;
        this.statusData =
          this.statusOptions.find(item => item.key === data.priority) || {};
      }
    }
  },
  mounted() {
    const { id } = this.$route.params;
    this.getTodoDetail(id);
  },
  render() {
    const { statusData, todoData } = this.$data;

    return (
      <EContainer class={classNames(styles.todoDetail)}>
        <EHeader />
        <EContent>
          <div class={styles.todoDetailContent}>
            <div class={styles.todoDetailHeader}>
              <div class={styles.todoDetailHeaderItem}>
                <span
                  style={{
                    color: statusData.color
                  }}
                >
                  {statusData.name || "优先级"}
                </span>
              </div>
              <div class={styles.todoDetailHeaderItem}>
                <div class={styles.todoDetailClaim}>
                  <i class={classNames("iconfont", styles.icon)}>&#xe668;</i>
                  <span>
                    {this.$moment(todoData.date).calendar(null, {
                      sameElse: "MM-DD HH:mm"
                    })}
                  </span>
                </div>
              </div>
            </div>
            <van-divider />
            <div
              class={classNames(styles.todoDetailTitle, {
                [styles.finished]: todoData.isFinished
              })}
            >
              <span class={styles.todoDetailCheck}>
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
                readonly={true}
                placeholder="标题"
              />
            </div>
            <van-field
              class={classNames(styles.todoDetailInput, styles.textarea)}
              value={todoData.description}
              showWordLimit={true}
              readonly={true}
              maxlength="200"
              type="textarea"
              rows="10"
              autosize
              placeholder="记录你的美好"
            />
          </div>
        </EContent>
      </EContainer>
    );
  }
};
