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
            <div class={styles.emptyCardItem}>
              <p></p>
              <div></div>
            </div>
          ))}
        </div>
      )
    );
  }
});
