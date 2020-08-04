import styles from "./index.module.less";

export default {
  name: "Empty",
  render() {
    return (
      <div class={styles.emptyBox}>
        <van-empty
          image={require("@/assets/image/empty.svg")}
          description="暂无数据"
        >
          {this.$slots.default}
        </van-empty>
      </div>
    );
  }
};
