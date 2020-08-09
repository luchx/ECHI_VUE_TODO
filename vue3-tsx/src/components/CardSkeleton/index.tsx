import styles from "./index.module.less";
import { defineComponent } from 'vue';

export default defineComponent({
  name: "CardSkeleton",
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    // 默认展示条数
    rows: {
      type: Number,
      default: 5
    }
  },
  render() {
    const { loading, rows } = this.$props;
    const defaultList = new Array(rows).fill(1);

    return (
      loading && (
        <div class={styles.emptyCard}>
          {defaultList.map(() => (
            // <van-skeleton class={styles.emptyCardItem} row={2} />
          ))}
        </div>
      )
    );
  }
});
