import { defineComponent, getCurrentInstance, onMounted, reactive } from 'vue';
import classNames from "classnames";
import router from '/@/router';
import { useRoute } from 'vue-router';
import { Button, Toast, Divider, Field, ActionSheet, Popup, DatetimePicker } from 'vant';
import { ApiGetTodoDetail, ApiSaveTodoList } from "/@/api/todo";
import EContainer from '/@/components/Container';
import EHeader from '/@/components/Header';
import EContent from '/@/components/Content';
import { priorityOption } from "/@/utils/constant";
import styles from "./index.module.less";

interface TodoDetailState {
  id: any;
  statusVisible: boolean;
  statusData: any;
  currentDate: Date;
  visibleDate: boolean;
  todoData: any;
  title: string;
  description: string;
  date: number;
  priority: number;
}

export default defineComponent({
  name: "TodoDetail",
  setup() {
    const { ctx } = getCurrentInstance() as any;
    const state = reactive<TodoDetailState>({
      id: null,
      statusVisible: false,
      statusData: {},
      currentDate: new Date(),
      visibleDate: false,
      todoData: {},
      title: "",
      description: "",
      date: +new Date(),
      priority: 0
    });

    async function getTodoDetail(id) {
      if (!id) {
        return;
      }
      const resp = await ApiGetTodoDetail(id);
      if (resp.code === 0) {
        const data = resp.result;
        state.todoData = data;
        state.title = data.title;
        state.description = data.description;
        state.date = data.date;
        state.priority = data.priority;
        state.statusData = priorityOption.find(item => item.key === data.priority) || {};
      }
    }

    function handleOpenDate() {
      state.visibleDate = true;
    }

    function handleCloseDate() {
      state.visibleDate = false;
    }

    function handleConfirmDate(value) {
      console.log(value);
      state.date = ctx.$moment(value);
      handleCloseDate();
    }

    function handleOpenStatus() {
      state.statusVisible = true;
    }

    function handleCloseStatus() {
      state.statusVisible = false;
    }

    function handleSelectStatus(value) {
      state.statusData = value;
      state.priority = value.key;
      handleCloseStatus();
    }

    async function handleSave() {
      if (!state.title) {
        Toast("请填写标题~");
        return;
      }

      const data = {
        title: state.title,
        description: state.description,
        date: state.date,
        priority: state.priority
      };

      if (state.id) {
        data["id"] = state.id;
      }
      console.log(data);
      const resp = await ApiSaveTodoList(data);
      if (resp.code === 0) {
        Toast.success("提交成功");
        setTimeout(() => {
          router.replace({
            name: "Todo"
          });
        }, 1500);
      }
    }

    onMounted(() => {
      const { query } = useRoute();
      const { id } = query;
      state["id"] = id;
      getTodoDetail(id);
    });

    return () => (
      <EContainer class={classNames(styles.todoDetail)}>
        <EHeader
          extra={
            <Button
              plain
              type="primary"
              class={styles.saveBtn}
              onClick={handleSave}
            >
              保存
            </Button>
          }
        />
        <EContent>
          <div class={styles.todoDetailContent}>
            <div class={styles.todoDetailHeader}>
              <div
                class={styles.todoDetailHeaderItem}
                onClick={handleOpenStatus}
              >
                <span
                  style={{
                    color: state.statusData.color
                  }}
                >
                  {state.statusData.name || "优先级"}
                </span>
              </div>
              <div class={styles.todoDetailHeaderItem}>
                <div
                  class={styles.todoDetailClaim}
                  onClick={handleOpenDate}
                >
                  <i class={classNames("iconfont", styles.icon)}>&#xe668;</i>
                  <span>
                    {ctx.$moment(state.date).calendar(undefined, {
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
                [styles.finished]: state.todoData.status === 2
              })}
            >
              {state.id && (
                <span class={styles.todoDetailCheck}>
                  {state.todoData.status === 2 ? (<i class={classNames("iconfont", styles.icon)}>&#xe606;</i>) : (<i class={classNames("iconfont", styles.icon)}>&#xe6ca;</i>)}
                </span>
              )}
              <Field
                class={classNames(styles.todoDetailInput)}
                modelValue={state.title}
                onInput={event => (state.title = event.target.value)}
                placeholder="标题"
                style={{
                  paddingLeft: state.id ? "" : 0
                }}
              />
            </div>
            <Field
              class={classNames(styles.todoDetailInput, styles.textarea)}
              modelValue={state.description}
              onInput={event => (state.description = event.target.value)}
              showWordLimit={true}
              maxlength="200"
              type="textarea"
              rows="10"
              autosize
              placeholder="记录你的美好"
            />
          </div>
        </EContent>
        <ActionSheet
          show={state.statusVisible}
          onInput={handleCloseStatus}
          actions={priorityOption}
          round={false}
          onSelect={handleSelectStatus}
        />
        <Popup
          show={state.visibleDate}
          onInput={handleCloseDate}
          position="bottom"
        >
          <DatetimePicker
            onCancel={handleCloseDate}
            onConfirm={handleConfirmDate}
            modelValue={state.currentDate}
            type="datetime"
            title="选择完整时间"
          />
        </Popup>
      </EContainer>
    )
  },
});
