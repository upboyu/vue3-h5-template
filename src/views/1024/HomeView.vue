<template>
  <div class="home">
    <div class="bg"></div>
    <RouterView />
  </div>
</template>
<script setup></script>
<style scoped lang="scss">
.home {
  min-height: 100%;
  background:
    url('@/assets/images/home_bg.png') no-repeat 0 0 / 100% auto,
    #1a43bb;
  .bg {
    height: 665px;
  }
}
</style>
