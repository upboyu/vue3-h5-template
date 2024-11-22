<template>
  <div class="test-wrap" v-if="showTestComponent">
    <div class="test-button" @click="handleClick"></div>
    <div v-if="show" class="test">
      <div v-for="(value, key) in data" :key="key">
        <span style="font-weight: 600">{{ key }}: </span>
        <span>{{ value }}</span>
      </div>
      <van-button type="primary" @click="handleSignIn"> 签到测试</van-button>
      <br />
    </div>
  </div>
</template>

<script setup>
// 生产环境不显示
const showTestComponent = import.meta.env.VITE_APP_ENV !== 'production'

// 连续点击五次切换显示
const show = ref(false)
const { inc, reset, count } = useCounter(0)
const { start, stop } = useTimeoutFn(() => reset(), 500)
const handleClick = () => {
  inc()
  if (count.value === 5) {
    show.value = !show.value
    reset()
    stop()
  } else {
    start()
  }
}

// 展示调试信息
const { fullPath } = toRefs(useRoute())
const data = reactive({
  url: window.location.href,
  fullPath,
  扫码结果: ''
})

// 扫码
function handleSignIn() {
  dsBridge.call('event.scanAction', (res) => {
    alert(res)
    alert(typeof res)
    data['扫码结果'] = JSON.parse(res)
  })
}
</script>

<style lang="scss" scoped>
.test-wrap {
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-all;
  .test-button {
    position: fixed;
    top: 0;
    right: 0;
    width: 75px;
    height: 75px;
    z-index: 99999;
  }
  .test {
    position: fixed;
    top: 0;
    z-index: 9999;
  }
}
</style>
