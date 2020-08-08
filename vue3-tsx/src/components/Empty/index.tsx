import styles from "./index.module.less";
import { defineComponent } from 'vue';

export default defineComponent({
  name: "Empty",
  render() {
    return (
      <div class={styles.emptyBox}>
        <div class={styles.emptyImg}>
          <img src={require("@/assets/image/empty.svg")} />
        </div>
        <p class={styles.emptyDesc}>暂无数据</p>
      </div>
    )
  }
});

