<template>
  <div class="wrap">
    <van-image
      class="profile"
      round
      fit="cover"
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      :icon-size="pxToReal(82)"
      :error-icon="img"
    />
    <div class="personnel-information">
      <div class="name">{{ name }}</div>
      <div class="department">{{ department }}</div>
    </div>
    <div class="sign-in-time">{{ time }}</div>
  </div>
  <div class="bottom-line"></div>
</template>

<script setup>
import { pxToReal } from '@/utils/index'
import img from '@/assets/images/默认头像.png'

const name = ref('陈歌')
const department = ref('综合部(党员办公室)')
const time = ref('2024-10-30 04:20')
</script>

<style scoped lang="scss">
.wrap {
  width: 630px;
  margin-left: 60px;
  display: flex;
  position: relative;
  align-items: center;
  // 头像
  .profile {
    width: 82px;
    height: 82px;
    margin: 32px 20px 32px 0;
  }
  // 用户信息
  .personnel-information {
    padding-top: 30px;
    padding-bottom: 30px;
    width: 281px;
    .name {
      font-family: PingFangSC-Medium;
      font-size: 36px;
      color: #333333;
      letter-spacing: 0;
      line-height: 40px;
      font-weight: 500;
      margin-bottom: 14px;
    }
    .department {
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #999999;
      letter-spacing: 0;
      line-height: 32px;
      font-weight: 400;
      .darker {
        color: #666666;
      }
    }
  }
  // 签到时间
  .sign-in-time {
    font-family: PingFangSC-Regular;
    font-size: 28px;
    letter-spacing: 0;
    text-align: right;
    line-height: 40px;
    font-weight: 400;
    color: #999999;
  }
}
.bottom-line {
  box-sizing: border-box;
  width: 565px;
  height: 1px;
  margin-left: 112px;
  border-bottom: 1px solid rgba(223, 223, 223, 1);
}
</style>
