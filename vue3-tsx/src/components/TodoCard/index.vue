<template>
  <ECardSkeleton :loading="loading" v-if="loading" />
  <EEmpty v-else-if="todoList.length === 0 && !loading" />
  <TransitionGroup name="list" tag="section" class="cardWrapper" v-else>
    <van-swipe-cell class="cardCell" v-for="item in todoList" :key="item.id">
      <template #right>
        <div :style="{ height: '100%' }">
          <EButton
            v-if="recycle"
            :style="{ height: '100%' }"
            square
            type="primary"
            @click="() => handleRestore(item)"
          >
          还原
          </EButton>
          <EButton
            :style="{ height: '100%' }"
            square
            type="danger"
            @click="() => handleDelete(item)"
          >
          删除
          </EButton>
        </div>
      </template>
      <div :class="['cardContent', { finished: item.status === 2 }]" @click="() => goDetail(item)">
        <div class="cardInfo">
          <span
            v-if="!recycle && showCheck"
            class="cardCheck"
            @click="(event) => handleToggleCheck(event, item)"
          >
            <i class="iconfont icon" v-html="item.status === 2 ? '&#xe606;' : '&#xe6ca;'" />
          </span>
          <p class="cardText">{{ item.title }}</p>
        </div>
        <div :class="['cardClaim', { recycle: recycle || !showCheck }]">
          <i class="iconfont icon">&#xe611;</i>
          <span>
            {{
              $moment(item.date).calendar(null, {
                sameDay: '[今天]',
                nextDay: '[明天]',
                nextWeek: 'MM-DD HH:mm',
                lastDay: '[昨天]',
                lastWeek: 'MM-DD HH:mm',
                sameElse: 'MM-DD HH:mm',
              })
            }}
          </span>
        </div>
      </div>
    </van-swipe-cell>
  </TransitionGroup>
</template>

<script lang="ts">
import { defineComponent} from 'vue';
import ECardSkeleton from '/@/components/CardSkeleton';
import EEmpty from '/@/components/Empty';
import EButton from '/@/components/Button';
import { Dialog, SwipeCell } from 'vant';

export default defineComponent({
  name: 'TodoCard',
  components: {
    ECardSkeleton,
    EEmpty,
    EButton,
    [SwipeCell.name]: SwipeCell,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    // 列表数据
    todoList: {
      type: Array,
      default: () => [],
    },
    // 是否处于回收站
    recycle: {
      type: Boolean,
      default: false,
    },
    // 是否展示复选项
    showCheck: {
      type: Boolean,
      default: true,
    },
    isReadonly: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['check', 'goDetail', 'del', 'restore'],
  setup(props, { emit }) {
    function handleToggleCheck(event, item) {
      if(props.isReadonly) return;
      event.stopPropagation();
      item.status = item.status === 1 ? 2 : 1;
      emit('check', item);
    }

    function goDetail(item) {
      emit('goDetail', item);
    }

    function handleDelete(item) {
      const { recycle } = props;
      Dialog.confirm({
        message: recycle ? '确认彻底删除此记录?' : '确定删除吗?',
      }).then(() => {
        emit('del', item);
      });
    }

    function handleRestore(item) {
      emit('restore', item);
    }

    return {
      handleToggleCheck,
      goDetail,
      handleDelete,
      handleRestore,
    };
  },
});
</script>

<style lang="less" scoped>
.cardWrapper {
  display: block;
  padding: @primary-gap;

  .cardCell:last-child .cardContent {
    margin-bottom: 0;
  }
  .cardContent {
    display: block;
    padding: @primary-gap;
    background-color: #fff;
    box-shadow: @box-shadow-base;
    border-radius: @border-radius-base;
    margin-bottom: @primary-gap;
    &.finished {
      .cardText,
      .cardClaim,
      .cardCheck {
        color: @disabled-color;
      }
    }
  }

  .cardInfo {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 8px;
  }

  .cardCheck {
    display: block;
    color: @primary-color;
    min-width: 30px;
    .icon {
      font-size: 16px;
      color: inherit;
    }
  }

  .cardText {
    position: relative;
    display: block;
    font-size: 16px;
    /*px*/
    color: @text-color;
    margin: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .cardClaim {
    font-size: 12px;
    /*px*/
    color: @danger-color;
    &:not(.recycle) {
      margin-left: 30px;
    }

    .icon {
      font-size: 12px;
      color: inherit;
      margin-right: 4px;
    }
  }
}
</style>
