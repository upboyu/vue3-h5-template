<template>
  <van-popup
    v-model:show="show"
    class="wrap"
    closeable
    close-icon="none"
    close-icon-position="bottom-left"
    :close-on-click-overlay="false"
  >
    <div class="title" :class="{ no: confirmationType == 'N' }">{{ title }}</div>
    <div v-if="message" class="message">{{ message }}</div>
    <div v-if="showReasonField" class="reason">
      <van-field
        class="reason-field"
        v-model="reason"
        rows="3"
        type="textarea"
        placeholder="请输入拒绝原因"
      />
    </div>
    <div class="footer">
      <van-button
        class="button cancel"
        round
        block
        type="primary"
        native-type="submit"
        @click="handleConfirm('N')"
      >
        取消
      </van-button>
      <van-button
        class="button confirm"
        round
        block
        type="primary"
        native-type="submit"
        @click="handleConfirm('Y')"
      >
        提交
      </van-button>
    </div>
  </van-popup>
</template>

<script setup>
const props = defineProps(['confirmationType', 'title', 'message', 'showReasonField'])
const emit = defineEmits(['confirm'])
const show = defineModel('show')
const { confirmationType, title, message, showReasonField } = toRefs(props)
const reason = ref()

function handleConfirm(params) {
  if (params === 'Y') {
    emit('confirm', reason.value)
  }
  show.value = false
  reason.value = undefined
}
</script>

<style lang="scss" scoped>
.wrap {
  width: 590px;
  background: #ffffff;
  border-radius: 40px;
  box-sizing: border-box;
  padding: 80px 0 60px;
  top: calc(50% - 50px);
  .title {
    font-family: PingFangSC-Semibold;
    font-size: 36px;
    color: #3b92fc;
    letter-spacing: 0;
    line-height: 50px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 40px;
    &.no {
      font-size: 32px;
      color: #333333;
      margin-top: -20px;
    }
  }
  .message {
    font-family: PingFangSC-Regular;
    font-size: 26px;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
    line-height: 36px;
    font-weight: 400;
    margin-bottom: 60px;
  }
  .reason {
    border: 1px solid rgba(204, 204, 204, 1);
    border-radius: 10px;
    margin: 0 40px 40px;
    overflow: hidden;
    .reason-field {
      height: 100%;
    }
  }
  .footer {
    display: flex;
    justify-content: space-evenly;
    .button {
      width: 215px;
      height: 90px;
      background: #f5f5f5;
      border-radius: 53px;
      font-family: PingFangSC-Semibold;
      font-size: 36px;
      color: #999999;
      text-align: center;
      font-weight: 600;
      border: none;
      &.confirm {
        background: #3a90ff;
        color: #ffffff;
      }
    }
  }
}
.van-overlay {
  background: rgba(0, 0, 0, 0.4);
}
</style>
