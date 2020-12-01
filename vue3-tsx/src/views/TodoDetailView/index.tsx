import { defineComponent } from 'vue';
import EContainer from '/@/components/Container';
import EHeader from '/@/components/Header';
import EContent from '/@/components/Content';
import styles from "./index.module.less";
import classNames from "classnames";
import { ApiGetTodoDetail } from "/@/api/todo";
import { priorityOption } from "/@/utils/constant";
import { Divider, Field } from 'vant';

export default defineComponent({
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
      const resp = await ApiGetTodoDetail(id);
      if (resp.code === 0) {
        const data = resp.result;
        this.todoData = data;
        this.statusData = priorityOption.find(item => item.key === data.priority) || {};
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
            <Divider />
            <div
              class={classNames(styles.todoDetailTitle, {
                [styles.finished]: todoData.status === 2
              })}
            >
              <span class={styles.todoDetailCheck}>
                {todoData.status === 2 ? (<i class={classNames("iconfont", styles.icon)}>&#xe606;</i>) : (<i class={classNames("iconfont", styles.icon)}>&#xe6ca;</i>)}
              </span>
              <Field
                class={classNames(styles.todoDetailInput)}
                modelValue={todoData.title}
                readonly={true}
              />
            </div>
            <Field
              class={classNames(styles.todoDetailInput, styles.textarea)}
              modelValue={todoData.description}
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
});
