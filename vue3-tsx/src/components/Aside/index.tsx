import { defineComponent, reactive, computed, inject, Transition, watchEffect } from 'vue';
import { useStore } from "vuex";
import styles from "./index.module.less";
import classNames from "classnames";
import DEFAULT_USER_Male from "/@/assets/image/male.jpg";
import DEFAULT_USER_FEMale from "/@/assets/image/female.jpg";
import { RouterLink, useRouter } from 'vue-router';
import { Icon } from 'vant';

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
  show: boolean;
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
    });

    const userInfo: any = computed(() => store.state.user.userInfo);

    function handleToggle(event) {
      event.stopPropagation();
      setToggle(false);
    }

    function handleEnter() {
      state.show = true;
    }

    function handleLeave() {
      state.show = false;
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
      handleEnter,
      handleLeave,
      handleGoLogin
    }
  },
  render() {
    const { handleToggle, handleGoLogin, handleEnter, handleLeave } = this;
    const { collapsed, state, userInfo } = this;

    const { asideList, countData } = state;

    return (
      <Transition
        name="fade"
        onAfterEnter={handleEnter}
        onBeforeLeave={handleLeave}
      >
        {collapsed ? (
          <section class={styles.aside}>
            <div class={styles.asideMask} onClick={handleToggle}></div>
            <div
              class={classNames(styles.asideContent, { [styles.show]: state.show })}
            >
              <div class={styles.asideUser} onClick={handleGoLogin}>
                <div class={styles.asideUserImg}>
                  <img
                    src={
                      userInfo.avatar ||
                      (userInfo.gender === 2
                        ? DEFAULT_USER_FEMale
                        : DEFAULT_USER_Male)
                    }
                  />
                </div>

                <div class={styles.asideUserInfo}>
                  <p class={styles.asideUserTitle}>
                    {userInfo.nickname ||
                      `代号 ${10000 + userInfo.id}`}
                  </p>
                  <p class={styles.asideUserText}>
                    {userInfo.description || "记录生活的美好~"}
                  </p>
                </div>
              </div>
              {asideList.map(group => (
                <div class={styles.asideGroup}>
                  <div class={styles.asideTitle}>{group.groupName}</div>
                  {group.children.map(child => (
                    <RouterLink
                      to={child.path}
                      class={styles.asideItem}
                    >
                      <span class={styles.asideItemLeft}>
                        <Icon
                          name={child.iconName}
                          class={styles.icon}
                          color={child.iconColor}
                        />
                        {child.name}
                      </span>
                      <span class={styles.asideItemRight}>
                        {countData[child.key]}
                      </span>
                    </RouterLink>
                  ))}
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </Transition>
    );
  }
});
