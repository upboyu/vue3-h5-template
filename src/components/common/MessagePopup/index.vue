<!-- 
 使用方法：通过函数调用 MessagePopup({ type: 'success|error', title: '', text: '说明文字，支持html格式字符串' })
-->
<template>
  <van-popup
    v-model:show="show"
    class="message-popup"
    closeable
    close-icon="none"
    close-icon-position="bottom-left"
    :close-on-click-overlay="false"
    @closed="emit('close')"
  >
    <div class="icon" :class="[props.type, isThemeUsed ? 'themed' : 'unthemed']"></div>
    <div
      v-if="props.title"
      class="title"
      :class="[props.type, isThemeUsed ? 'themed' : 'unthemed']"
    >
      {{ props.title }}
    </div>
    <div
      class="text"
      :class="[props.type, isThemeUsed ? 'themed' : 'unthemed']"
      v-html="props.text"
    ></div>
  </van-popup>
</template>

<script setup name="MessagePopup">
import useAppStore from '@/stores/app'
const appStore = useAppStore()
const isThemeUsed = computed(() => appStore.theme.isThemeUsed)

const props = defineProps(['type', 'title', 'text'])
const emit = defineEmits(['close'])

const show = ref(true)
</script>

<style scoped lang="scss">
.message-popup {
  width: 590px;
  background: #ffffff;
  border-radius: 40px;
  overflow: visible;
  box-sizing: border-box;
  padding: 100px 40px 20px;
  top: calc(50% - 50px);
  :deep() .van-popup__close-icon {
    left: 256px;
    bottom: -100px;
    width: 60px;
    height: 60px;
    background: url('@/assets/images/关闭弹窗.png') no-repeat 0 0 / 100% auto;
  }
  .icon {
    width: 152px;
    height: 152px;
    margin: 0 auto;
    border-radius: 50%;
    &.success {
      margin-bottom: 47px;
      &.unthemed {
        background: url('@/assets/images/报名成功.png') no-repeat 0 0 / 100% auto;
      }
      &.themed {
        background:
          url('@/assets/images/theme/签到成功.png') no-repeat 0 0 / 100% auto,
          linear-gradient(144deg, var(--theme-success-color1) 0%, var(--theme-success-color2) 100%);
      }
    }
    &.error {
      margin-bottom: 37px;
      &.unthemed {
        background: url('@/assets/images/报名失败.png') no-repeat 0 0 / 100% auto;
      }
      &.themed {
        background:
          url('@/assets/images/theme/提示.png') no-repeat 0 0 / 100% auto,
          linear-gradient(162deg, var(--theme-error-color1) 0%, var(--theme-error-color2) 100%);
      }
    }
  }

  .title {
    font-family: PingFangSC-Semibold;
    font-size: 36px;
    letter-spacing: 0;
    text-align: center;
    line-height: 40px;
    font-weight: 600;
    margin-bottom: 30px;
    &.success {
      &.unthemed {
        color: #3b92fc;
      }
      &.themed {
        color: var(--theme-success-title);
      }
    }
    &.error {
      &.unthemed {
        color: #ff1414;
      }
      &.themed {
        color: var(--theme-error-title);
      }
    }
  }
  .text {
    font-family: PingFangSC-Regular;
    font-size: 28px;
    letter-spacing: 0;
    text-align: center;
    line-height: 50px;
    font-weight: 400;
    margin-bottom: 70px;
    &.success {
      &.unthemed {
        color: #2f3036;
      }
      &.themed {
        color: var(--theme-success-text);
      }
    }
    &.error {
      &.unthemed {
        color: #666666;
      }
      &.themed {
        color: var(--theme-error-text);
      }
    }
  }
}
.van-overlay {
  background: rgba(0, 0, 0, 0.4);
}
</style>
