<template>
  <img src="@/assets/images/back_arrow.png" alt="" class="topLeftBackButton" @click="handleBack" />
</template>

<script setup>
const router = useRouter()
const route = useRoute()
const isRoot = computed(() => route.meta.isRoot)

function handleBack() {
  // 如果是根路径，关闭webview
  if (isRoot.value) {
    dsBridge.call('event.close')
  }
  // 否则返回上一步
  router.back()
}
</script>

<style lang="scss" scoped>
.topLeftBackButton {
  position: fixed;
  left: 28px;
  top: 116.71px;
  width: 32px;
  z-index: 99999;
}
</style>
