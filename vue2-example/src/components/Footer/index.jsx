import styles from "./index.module.less";
import classNames from "classnames";

export default {
  name: "Footer",
  data() {
    return {
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
    };
  },
  render() {
    const { list } = this.$data;
    return (
      <section class={styles.footer}>
        {list.map(item => (
          <router-link
            to={item.path}
            activeClass={styles.active}
            class={styles.iconItem}
            key={item.key}
          >
            <i
              class={classNames("iconfont", styles.icon)}
              domPropsInnerHTML={item.icon}
            ></i>
            <p>{item.title}</p>
          </router-link>
        ))}
      </section>
    );
  }
};
