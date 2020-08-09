import { defineComponent, reactive, computed, inject } from 'vue';
import { useStore } from "vuex";
import styles from "./index.module.less";
import classNames from "classnames";
import DEFAULT_USER_Male from "/@/assets/image/male.jpg";
import DEFAULT_USER_FEMale from "/@/assets/image/female.jpg";
import { useRouter, RouterLink } from 'vue-router';
import router from '/@/router';

type CountData = {
  todo: number;
  date: number;
  finished: number;
}

type AsideListArray = {
  name: string;
  key: string;
  path: string;
  iconName: string;
  iconColor: string;
}

type AsideList = {
  groupName: string;
  children: Array<AsideListArray>;
}

type AsideState = {
  countData: CountData;
  asideList: Array<AsideList>;
}

export default defineComponent({
  name: "Aside",
  setup() {
    const store = useStore();
    const router = useRouter();
    const [collapsed, setToggle] = inject<any>("parent");

    const state = reactive<AsideState>({
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
    });

    const userInfo = computed(() => store.state.user.userInfo);

    function handleToggle(event) {
      event.stopPropagation();
      setToggle(false);
    }

    function handleGoLogin() {
      if (Object.keys(userInfo).length === 0) {
        router.replace({
          name: "Login"
        });
      }
    }

    return {
      state,
      router,
      userInfo,
      collapsed,
      handleToggle,
      handleGoLogin
    }
  },
  render() {
    const { handleToggle, handleGoLogin } = this;
    const { collapsed, state, userInfo, router } = this;

    const { asideList, countData } = state;

    return (
      collapsed && (
        <section class={styles.aside}>
          <div class={styles.asideMask} onClick={handleToggle}></div>
          <div
            class={classNames(classNames({
              [styles.asideContent]: true,
              "animate__animated animate__slideInLeft": true
            }))}
          >
            <div class={styles.asideUser} onClick={handleGoLogin}>
              <div class={styles.asideUserImg}>
                <img
                  src={
                    userInfo.avatar ||
                    (userInfo.sex === 2
                      ? DEFAULT_USER_FEMale
                      : DEFAULT_USER_Male)
                  }
                />
              </div>

              <div class={styles.asideUserInfo}>
                <p class={styles.asideUserTitle}>
                  {userInfo.userName || "未登录"}
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
                  <div class={styles.asideItem} key={child.key} onClick={() => router.push(child.path)}>
                    <span class={styles.asideItemLeft}>
                      {/* <van-icon
                        name={child.iconName}
                        class={styles.icon}
                        color={child.iconColor}
                      /> */}
                      {child.name}
                    </span>
                    <span class={styles.asideItemRight}>
                      {countData[child.key]}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      )
    );
  }
});
