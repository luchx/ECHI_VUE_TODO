import styles from "./index.module.less";
import classNames from "classnames";
import { ApiGetTodoDetail } from "@/api/todo";
import { priorityOption } from "@/utils/constant";

export default {
  name: "TodoDetailView",
  data() {
    return {
      statusData: {},
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
          priorityOption.find(item => item.key === data.priority) || {};
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
              <span class={styles.todoDetailCheck}>
                <i
                  class={classNames("iconfont", styles.icon)}
                  domPropsInnerHTML={
                    todoData.status === 2 ? "&#xe606;" : "&#xe6ca;"
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
