import { defineComponent, reactive } from 'vue';
import { RouterLink } from 'vue-router';
import classNames from "classnames";
import styles from "./index.module.less";

export default defineComponent({
  name: "Footer",
  setup() {
    const state = reactive({
      list: [
        {
          title: "待办",
          key: "todo",
          path: "/todo",
          icon: "&#xe69e;"
        },
        {
          title: "日程",
          key: "date",
          path: "/date",
          icon: "&#xe668;"
        },
        {
          title: "回顾",
          key: "review",
          path: "/review",
          icon: "&#xe68a;"
        }
      ]
    })

    return {
      state
    }
  },
  render() {
    const { list } = this.state;
    
    return (
      <section class={styles.footer}>
        {list.map(item => (
          <RouterLink
            to={item.path}
            router-link-active={styles.active}
            key={item.key}
          >
            <div class={styles.iconItem}>
              <i
                class={classNames("iconfont", styles.icon)}
                domPropsInnerHTML={item.icon}
              ></i>
              <p>{item.title}</p>
            </div>
          </RouterLink>
        ))}
      </section>
    );
  }
});
