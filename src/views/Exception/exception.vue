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
            <van-button plain type="info" size="small">返回首页</van-button>
          </router-link>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import config from "./config";

export default Vue.extend({
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
  data() {
    return {
      config
    };
  },
  computed: {
    pageType(): string {
      return this.type in this.config ? this.type : "404";
    }
  }
});
</script>

<style lang="less" scoped>
.exception {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
      font-size: 26px; /*px*/
      font-weight: 600;
      margin-bottom: 24px;
    }

    .desc {
      color: @text-color-secondary;
      font-size: 18px; /*px*/
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
