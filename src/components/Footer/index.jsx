import styles from "./index.less";
import classNames from "classnames";

export default {
  name: "Footer",
  props: {
    activeKey: {
      type: String,
      default: "todo",
    },
  },
  data() {
    return {
      list: [
        {
          title: "待办",
          key: "todo",
          path: '/todo',
          icon: "&#xe60f;",
        },
        {
          title: "日程",
          key: "date",
          path: '/date',
          icon: "&#xe60f;",
        },
        {
          title: "回顾",
          key: "review",
          path: '/review',
          icon: "&#xe60f;",
        },
      ],
    };
  },
  render() {
    const { activeKey } = this.$props;
    const { list } = this.$data;
    return (
      <section class={styles.footer}>
        {list.map((item) => (
          <router-link
            to={item.path}
            class={classNames(styles.iconItem, {
              [styles.active]: item.key === activeKey,
            })}
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
  },
};
