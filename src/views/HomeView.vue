<template>
  <div class="wrap">
    <header>
      <RouterLink to="/">
        <van-button type="primary">home</van-button>
      </RouterLink>
      <RouterLink to="/about">
        <van-button type="primary">about</van-button>
      </RouterLink>
    </header>
  </div>
  <div class="home">
    <van-button type="primary" @click="handleClick()">button</van-button>
  </div>
</template>
<script setup>
// button
import { badRequest } from '@/api/example'
function handleClick() {
  badRequest()
}
</script>
<style scoped lang="scss">
.wrap {
  padding-top: 120px;
  header {
    text-align: center;
    color: red;
    .van-button {
      margin-right: 20px;
    }
  }
}
</style>
