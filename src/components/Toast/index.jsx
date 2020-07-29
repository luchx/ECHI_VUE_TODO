import { on, off } from "@/utils/dom";
import TipsComponent from "./tips";
import { isType } from "@/utils/index";

/**
 * v-tips
 * @desc 全局挂载 tips 组件, 必须搭配 TipsProvider 使用
 * @example
 *
 * modifiers?: string | object 支持显示方向 => ["top", "right", "bottom", "left"]
 * message!: string 展示内容
 *
 * ```vue
 *
 * Vue.use(TipsProvider);
 *
 * 支持直接以当前 target 对象传入，只支持在指令中使用
 * <tips-provider>
 *    <div v-tips>挂载节点（直接抓取 dom 节点展示）</div>
 * </tips-provider>
 * 
 * 通过指令调用、模板中推荐用法
 * <tips-provider>
 *    <div v-tips.top="上侧展示">挂载节点</div>
 *    <div v-tips.right="右侧展示">挂载节点</div>
 *    <div v-tips.bottom="下侧展示">挂载节点</div>
 *    <div v-tips.left="左侧展示">挂载节点</div>
 * </tips-provider>
 * 
 * jsx 中使用指令调用
 * <tips-provider>
 *    // 以下指令将返回 string 类型
 *    <div {...{
        directives: [
          {
            name: "tips",
            value: "左侧出现",
            modifiers: "left",
          },
        ],
      }}>挂载节点</div>

      // 以下指令将返回 object => v-tips.right="右侧出现"
 *    <div {...{
        directives: [
          {
            name: "tips",
            value: "右侧出现",
            modifiers: {
              right: true
            }
          },
        ],
      }}>挂载节点</div>

      // 以下指令将直接使用挂载的 vnode => v-tips
 *    <div {...{
        directives: [
          {
            name: "tips",
          },
        ],
      }}>挂载节点（直接抓取 dom 节点展示）</div>
 * </tips-provider>
 * ```
 */

//  存储 Tips 对象实例
let TipsInstance = null;
// 定义一个 Set 存储 dom
const tipsEleQuene = new Set();

const TipsProvider = {
  name: "TipsProvider",
  mounted() {
    on(this.$el, "mousemove", this.handleEnter);
    on(this.$el, "mouseleave", this.handleLeave);
  },
  beforeDestory() {
    off(this.$el, "mousemove", this.handleEnter);
    off(this.$el, "mouseleave", this.handleLeave);
  },
  methods: {
    handleLeave() {
      TipsInstance.close();
    },
    handleEnter(event) {
      const target = event.target;
      const targetRect = target.getBoundingClientRect();
      TipsInstance.close();
      const activeDom = [...tipsEleQuene].find((item) => item.contains(target));

      // 通过指令挂载的对象
      if (activeDom) {
        const modifiers =
          isType(activeDom.__TipsModifiers__) === "string"
            ? activeDom.__TipsModifiers__
            : Object.keys(activeDom.__TipsModifiers__ || {}).join(",");

        // 当前没有传值，则直接使用 vnode 节点挂载
        const title = activeDom.__TipsValue__ || activeDom.__TipsVNode__;

        TipsInstance.open({
          title,
          elRect: targetRect,
          position: modifiers,
        });
        return;
      }
    },
  },
  render() {
    return this.$slots.default;
  },
};

export default {
  install(Vue) {
    let TipsVNode = Vue.extend(TipsComponent);
    if (!TipsInstance) {
      TipsInstance = new TipsVNode().$mount();
      document.body.appendChild(TipsInstance.$el);
    }

    Vue.component("TipsProvider", TipsProvider);
    Vue.directive("tips", {
      bind(el, binding, vNode) {
        el.__TipsValue__ = binding.value;
        el.__TipsModifiers__ = binding.modifiers;
        el.__TipsVNode__ = vNode;
        tipsEleQuene.add(el);
      },
      unbind(el) {
        tipsEleQuene.delete(el);
      },
    });
  },
};
