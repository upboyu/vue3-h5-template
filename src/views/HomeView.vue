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
  <div class="home">home</div>
</template>
<script setup></script>
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
