import { defineComponent, inject } from 'vue';
import { useRouter } from 'vue-router';
import classNames from "classnames";
import styles from "./index.module.less";

export default defineComponent({
  name: "Header",
  props: {
    title: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "back"
    },
    extra: {
      type: Object,
      default: null
    },
    goBack: {
      type: Function,
      default: null
    }
  },
  setup(props) {
    const [, setToggle] = inject<any>("parent");
    const router = useRouter();

    function handleBack() {
      const { goBack } = props;
      if (typeof goBack === "function") {
        goBack();
        return;
      }
      router.back();
    }

    return {
      handleBack,
      setToggle
    }
  },
  render() {
    const { handleBack, setToggle } = this;
    const { type, title, extra } = this.$props;

    return (
      <header class={styles.header}>
        {type === "back" ? (
          <i
            class={classNames("iconfont", styles.icon)}
            onClick={handleBack}
          >
            &#xe60f;
          </i>
        ) : (
            <i
              class={classNames("iconfont", styles.icon)}
              onClick={setToggle}
            >
              &#xe61f;
            </i>
          )}
        <span class={styles.title}>{title}</span>
        <span class={styles.extra}>{extra}</span>
      </header>
    );
  }
});
