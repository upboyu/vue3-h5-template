<template>
  <div class="wrap">
    <div class="switch">
      <div class="bg"></div>
      <div class="current-bg" :class="{ 'current-bg-right': isFinal }"></div>
      <div class="text text-left" :class="{ current: !isFinal }" @click="isFinal = false">预赛</div>
      <div class="text text-right" :class="{ current: isFinal }" @click="isFinal = true">决赛</div>
    </div>
    <van-floating-panel class="main" :anchors="anchors">
      <div class="title">
        <div class="icon"></div>
        排行榜
        <div class="icon"></div>
      </div>
      <div v-if="arr.length">
        <div class="header">
          <div class="rank-text">排名</div>
          <div class="name-text">姓名</div>
          <div class="score-text">分数</div>
        </div>
        <RankItem v-for="(item, index) in arr" :key="item" :index="index" />
        <div class="footer">只显示前{{ arr.length + 1 }}名</div>
      </div>
      <div v-else class="empty">
        <div class="empty-title">暂无榜单信息</div>
        <div class="empty-text">决赛榜将于</div>
      </div>
    </van-floating-panel>
  </div>
</template>

<script setup>
const isFinal = ref(true)
const { height } = useWindowSize()
const anchors = computed(() => {
  return [Math.round(height.value - pxToReal(576)), Math.round(height.value - pxToReal(181))]
}) // 设置浮动面板位置
function pxToReal(designPx) {
  const designWidth = 750 // 设计图宽度
  const deviceWidth = window.innerWidth // 设备的实际宽度

  // 计算真实 px
  return designPx * (deviceWidth / designWidth)
}

const arr = [0, 0, 0, 0, 0, 0, 0]
</script>

<style scoped lang="scss">
.wrap {
  box-sizing: border-box;
  padding-top: 94px;
  height: 100%;
  background: url('@/assets/images/rank_bg.png') no-repeat 0 0 / 100% auto;
  .switch {
    width: 358px;
    height: 77px;
    margin: 0 auto 20px;
    position: relative;
    .bg {
      width: 358px;
      height: 77px;
      opacity: 0.2;
      background: #ffffff;
      border-radius: 50px;
    }
    .current-bg {
      background: #ffffff;
      border-radius: 50px;
      width: 144px;
      height: 77px;
      position: absolute;
      top: 0;
      left: 0;
      transition: left 0.2s ease;
    }
    .current-bg-right {
      left: 214px;
    }
    .text {
      width: 144px;
      height: 77px;
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #ffffff;
      font-weight: 400;
      position: absolute;
      top: 0;
      left: 0;
      line-height: 77px;
    }
    .text-right {
      left: 214px;
    }
    .text.current {
      color: #3a90ff;
      font-weight: 600;
    }
  }
  .main {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    box-sizing: border-box;
    .title {
      font-family: PingFangSC-Semibold;
      font-size: 36px;
      color: #3a90ff;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 30px;
      .icon {
        width: 16px;
        height: 16px;
        background: url('@/assets/images/排行榜点缀.png') no-repeat 0 0 / 100% auto;
        margin: 0 20px;
      }
    }
    .header {
      height: 32px;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #c8c8c8;
      letter-spacing: 0;
      line-height: 32px;
      font-weight: 400;
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      .rank-text {
        margin-left: 48px;
      }
      .name-text {
        margin-left: 136px;
      }
      .score-text {
        margin-left: 353px;
      }
    }
    .footer {
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #999999;
      letter-spacing: 0;
      line-height: 32px;
      font-weight: 400;
      text-align: center;
      padding-top: 30px;
      padding-bottom: 32px;
    }
    .empty {
      width: 666px;
      height: 519px;
      margin-left: 42px;
      background: url('@/assets/images/暂无榜单信息.png') no-repeat 0 0 / 100% auto;
      padding-top: 385px;
      box-sizing: border-box;
      .empty-title {
        font-family: PingFangSC-Semibold;
        font-size: 28px;
        color: #666666;
        letter-spacing: 0;
        text-align: center;
        line-height: 50px;
        font-weight: 600;
      }
      .empty-text {
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #999999;
        letter-spacing: 0;
        text-align: center;
        line-height: 50px;
        font-weight: 400;
      }
    }
  }
}
</style>
