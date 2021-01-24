<template>
  <div class="exception">
    <div class="img-block">
      <img :src="img || config[pageType].img" />
    </div>
    <div class="content">
      <h1>{{ title || config[pageType].title }}</h1>
      <div class="desc">{{ desc || config[pageType].desc }}</div>
      <div class="actions">
        <slot name="actions">
          <router-link to="/">
            <e-button plain type="primary" size="small">返回首页</e-button>
          </router-link>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import EButton from '/@/components/Button';
import config from "./config";

export default defineComponent({
  components: {
    EButton
  },
  props: {
    type: {
      type: String,
      default: "404"
    },
    title: {
      type: String,
      default: null
    },
    desc: {
      type: String,
      default: null
    },
    img: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const pageType = props.type in config ? props.type : "500";

    return {
      config,
      pageType,
    }
  },
});
</script>

<style lang="less" scoped>
.exception {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 100px;
  height: 100%;
  width: 100%;

  .img-block {
    display: block;
    width: 150px;
    height: 150px;

    > img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .img-ele {
    height: 360px;
    width: 100%;
    float: right;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
  }

  .content {
    text-align: center;
    h1 {
      color: #434e59;
      font-size: 18px; /*px*/
      font-weight: 600;
      margin-bottom: 24px;
    }

    .desc {
      color: @text-color-secondary;
      font-size: 14px; /*px*/
      margin-bottom: 16px;
    }

    .actions {
      button:not(:last-child) {
        margin-right: 8px;
      }
    }
  }
}
</style>
