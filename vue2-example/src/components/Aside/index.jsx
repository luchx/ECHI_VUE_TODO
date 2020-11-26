import styles from "./index.module.less";
import classNames from "classnames";
import DEFAULT_USER_Male from "@/assets/image/male.jpg";
import DEFAULT_USER_FEMale from "@/assets/image/female.jpg";
import { mapState } from "vuex";

export default {
  name: "Aside",
  inject: ["parent"],
  data() {
    return {
      show: false,
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
              key: "recycle",
              path: "/recycle",
              iconName: "underway",
              iconColor: "#f5222d"
            }
          ]
        }
      ]
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
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
    },
    handleGoLogin() {
      if (Object.keys(this.userInfo).length === 0) {
        this.$router.replace({
          name: "Login"
        });
      }
    }
  },
  render() {
    const { collapsed } = this.parent;
    const { show, asideList, countData } = this.$data;

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
              <div class={styles.asideUser} onClick={this.handleGoLogin}>
                <div class={styles.asideUserImg}>
                  <img
                    src={
                      this.userInfo.avatar ||
                      (this.userInfo.gender === 2
                        ? DEFAULT_USER_FEMale
                        : DEFAULT_USER_Male)
                    }
                  />
                </div>

                <div class={styles.asideUserInfo}>
                  <p class={styles.asideUserTitle}>
                    {this.userInfo.nickname ||
                      `代号 ${10000 + this.userInfo.id}`}
                  </p>
                  <p class={styles.asideUserText}>
                    {this.userInfo.description || "记录生活的美好~"}
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
