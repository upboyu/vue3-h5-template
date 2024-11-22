<template>
  <div class="rank-item-wrap" :class="[rank, rankType]">
    <div v-if="rankType === 'top3'" class="rank-icon" :class="rank"></div>
    <div v-else class="rank-text">{{ index + 1 }}</div>
    <van-image
      class="profile"
      round
      fit="cover"
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
    />
    <div class="personnel-information">
      <div class="name">{{ name }}</div>
      <div class="department">{{ department }}</div>
      <div v-if="rankType === 'top3'" class="time">
        答题时间：<span class="darker">{{ time }}</span>
      </div>
    </div>
    <div class="score" :class="rank">{{ score }}</div>
  </div>
  <div v-if="rankType !== 'top3'" class="bottom-line"></div>
</template>

<script setup>
const props = defineProps({
  index: {
    type: Number,
    required: true
  }
})
const { index } = toRefs(props)

const rank = computed(() => {
  return ['first', 'second', 'third'][index.value]
})
const rankType = computed(() => {
  if (index.value >= 0 && index.value <= 2) {
    return 'top3'
  } else {
    return 'fourth-and-below'
  }
})
const name = ref('陈歌')
const department = ref('综合部(党员办公室)')
const time = ref('04:20')
const score = ref('99')
</script>

<style scoped lang="scss">
.rank-item-wrap {
  width: 690px;
  margin-left: 30px;
  display: flex;
  position: relative;
  &.top3 {
    border-radius: 20px;
    height: 202px;
    &.first {
      background-image: linear-gradient(97deg, #fff6e7 0%, #ffffff 93%);
      margin-bottom: 20px;
    }
    &.second {
      background-image: linear-gradient(97deg, #eef3f4 0%, #ffffff 93%);
      margin-bottom: 20px;
    }
    &.third {
      background-image: linear-gradient(97deg, #fff0e7 0%, #ffffff 93%);
    }
    // 排名图标
    .rank-icon {
      width: 72px;
      height: 54px;
      position: absolute;
      top: 20px;
      left: 6px;
      z-index: 1;
      &.first {
        background: url('@/assets/images/第一.png') no-repeat 0 0 / 100% auto;
      }
      &.second {
        background: url('@/assets/images/第二.png') no-repeat 0 0 / 100% auto;
      }
      &.third {
        background: url('@/assets/images/第三.png') no-repeat 0 0 / 100% auto;
      }
    }
    // 头像
    .profile {
      width: 142px;
      height: 142px;
      margin: 30px;
    }
    // 用户信息
    .personnel-information {
      padding-top: 40px;
    }
    // 得分
    .score {
      padding-top: 71px;
    }
  }
  &.fourth-and-below {
    height: 146px;
    // 排名文字
    .rank-text {
      font-family: PingFangSC-Medium;
      font-size: 36px;
      color: #cecece;
      letter-spacing: 0;
      font-weight: 500;
      line-height: 146px;
      width: 82px;
      text-align: center;
    }
    // 头像
    .profile {
      width: 82px;
      height: 82px;
      margin: 32px 38px 32px 0;
    }
    // 用户信息
    .personnel-information {
      padding-top: 30px;
    }
    // 得分
    .score {
      padding-top: 53px;
    }
  }

  // 用户信息
  .personnel-information {
    padding-top: 40px;
    width: 404px;
    .name {
      font-family: PingFangSC-Medium;
      font-size: 36px;
      color: #333333;
      letter-spacing: 0;
      line-height: 40px;
      font-weight: 500;
      margin-bottom: 14px;
    }
    .department,
    .time {
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #999999;
      letter-spacing: 0;
      line-height: 32px;
      font-weight: 400;
      margin-bottom: 4px;
      .darker {
        color: #666666;
      }
    }
  }
  // 得分
  .score {
    font-family: PingFangSC-Medium;
    font-size: 36px;
    letter-spacing: 0;
    text-align: right;
    line-height: 40px;
    font-weight: 500;
    color: #999999;
    &.first {
      color: #f1a743;
    }
    &.second {
      color: #9ac1cd;
    }
    &.third {
      color: #f57446;
    }
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
