import Vue from 'vue';
import "./index.less";

export default Vue.extend({
  render() {
    return (
      <section class="wrapper">
        {this.$slots.default}
      </section>
    )
  }
})
