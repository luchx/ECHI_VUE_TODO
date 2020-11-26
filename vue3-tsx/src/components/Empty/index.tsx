import { defineComponent } from 'vue';
import EmptyImg from "/@/assets/image/empty.svg";
import styles from "./index.module.less";
import { Empty } from 'vant';

export default defineComponent({
  name: "Empty",
  setup(props, { slots }) {
    return () => (
      <div class={styles.emptyBox}>
        <Empty
          image={EmptyImg}
          description="暂无数据"
        >
          {slots.default && slots.default()}
        </Empty>
      </div>
    );
  }
});
