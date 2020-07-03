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
          icon: "&#xe60f;",
        },
        {
          title: "日程",
          key: "date",
          icon: "&#xe60f;",
        },
        {
          title: "回顾",
          key: "review",
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
          <div
            class={classNames(styles.iconItem, {
              active: item.key === activeKey,
            })}
            key={item.key}
          >
            <i
              class={classNames("iconfont", styles.icon)}
              domPropsInnerHTML={item.icon}
            ></i>
            <p>{item.title}</p>
          </div>
        ))}
      </section>
    );
  },
};
