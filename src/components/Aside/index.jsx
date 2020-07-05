import styles from "./index.module.less";
import classNames from "classnames";
import DEFAULT_USER_Male from "@/assets/image/male.jpg";
// import DEFAULT_USER_FEMale from "@/assets/image/female.jpg";

export default {
  name: "Aside",
  inject: ["parent"],
  data() {
    return {
      show: false,
      userInfo: {
        avatar: "",
        name: "Echi",
        description: "记录生活的美好~"
      },
      countData: {
        todo: 5,
        date: 3,
        finished: 8
      },
      asideList: [
        {
          groupName: "聚焦",
          children: [
            {
              name: "代办",
              key: "todo",
              path: "/todo",
              iconName: "todo-list",
              iconColor: "#1890ff"
            },
            {
              name: "日程",
              key: "date",
              path: "/date",
              iconName: "star",
              iconColor: "#1890ff"
            }
          ]
        },
        {
          groupName: "历史",
          children: [
            {
              name: "已完成",
              key: "finished",
              path: "/finished",
              iconName: "like",
              iconColor: "#52c41a"
            },
            {
              name: "回收站",
              path: "/recycle",
              iconName: "underway",
              iconColor: "#f5222d"
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleToggle(event) {
      event.stopPropagation();
      const { handleToggle } = this.parent;
      handleToggle(false);
    },
    handleEnter() {
      this.show = true;
    },
    handleLeave() {
      this.show = false;
    }
  },
  render() {
    const { collapsed } = this.parent;
    const { show, asideList, userInfo, countData } = this.$data;

    return (
      <transition
        name="fade"
        onAfterEnter={this.handleEnter}
        onBeforeLeave={this.handleLeave}
      >
        {collapsed && (
          <section class={styles.aside}>
            <div class={styles.asideMask} onClick={this.handleToggle}></div>
            <div
              class={classNames(styles.asideContent, { [styles.show]: show })}
            >
              <div class={styles.asideUser}>
                <div class={styles.asideUserImg}>
                  <img src={userInfo.avatar || DEFAULT_USER_Male} />
                </div>

                <div class={styles.asideUserInfo}>
                  <p class={styles.asideUserTitle}>
                    {userInfo.name || "未登录"}
                  </p>
                  <p class={styles.asideUserText}>
                    {userInfo.description || "登录后可使用更多功能~"}
                  </p>
                </div>
              </div>
              {asideList.map(group => (
                <div class={styles.asideGroup}>
                  <div class={styles.asideTitle}>{group.groupName}</div>
                  {group.children.map(child => (
                    <router-link
                      to={child.path}
                      tag="div"
                      class={styles.asideItem}
                    >
                      <span class={styles.asideItemLeft}>
                        <van-icon
                          name={child.iconName}
                          class={styles.icon}
                          color={child.iconColor}
                        />
                        {child.name}
                      </span>
                      <span class={styles.asideItemRight}>
                        {countData[child.key]}
                      </span>
                    </router-link>
                  ))}
                </div>
              ))}
            </div>
          </section>
        )}
      </transition>
    );
  }
};
