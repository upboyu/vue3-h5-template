<template>
  <div class="wrap">
    <div class="deadline">
      <div class="text">
        距离报名结束只剩
        <div class="time">10</div>
        天
        <div class="time">00</div>
        小时
        <div class="time">00</div>
        分
      </div>
    </div>
    <div class="main">
      <div class="people">
        <div>
          <div class="number number-left">123</div>
          <div class="text">参与人数</div>
        </div>
        <div class="line"></div>
        <div>
          <div class="number number-right">600</div>
          <div class="text">围观人数</div>
        </div>
      </div>
      <div class="date-wrap">
        <div class="title">
          <div class="bg"></div>
          <div class="current-bg" :class="{ 'to-right': isFinal }"></div>
          <p class="text text-left">预赛</p>
          <p class="text text-right">决赛</p>
        </div>
        <div class="date">
          <p class="text-left" :class="{ 'not-current-text': isFinal }">10.03-10.24</p>
          <p class="text-right" :class="{ 'not-current-text': !isFinal }">10.03-10.24</p>
        </div>
      </div>
      <div class="rule-wrap">
        <img src="@/assets/images/rule-title.png" class="title" />
        <div class="rule">
          尊敬的会员们: <br />
          您好!为了确保本次工会活动的顺利进行，增进会员间的交流与合作，营造和谐、愉快的活动氛围，特此制定以下活动须知，请大家仔细阅读并遵守:<br />
          <br />
          一、活动基本信息<br />
          活动名称:[具体活动名称]<br />
          活动时间:[具体日期]，上午/下午[具体时间]至[结束时间]<br />
          活动地点:[详细地址]<br />
          参与人员:全体会员及邀请嘉宾<br />
          <br />
          二、报名与签到<br />
          1.请各位会员于[报名截止日期]前通过[报名方式，如工会官网、微信群等]完成报名。<br />
          2.活动当天请提前[具体时间，如15分钟]到达活动现场签到，以便我们做好组织安排。<br />
          <br />
          三、着装要求<br />
          请根据活动性质穿着适宜的服装，如户外活动请穿着运动休闲装，正式场合请着正装或工会统一服装(如提供)<br />
          请注意个人形象，保持整洁得体。<br />
          <br />
          四、安全注意事项<br />
        </div>
      </div>
    </div>
    <div class="bottom-bar-wrap">
      <router-link :to="isSignUp ? '/1024/signUp' : '/1024/rank'">
        <div class="bottom-bar-left">
          <img v-if="!isSignUp" src="@/assets/images/排行榜.png" alt="" class="icon" />
          <div class="text" @click="handleRank">{{ isSignUp ? '报名信息' : '排行榜' }}</div>
          <p v-if="isSignUp">您已经报名</p>
        </div>
      </router-link>
      <router-link :to="!isSignUp ? '/1024/signUp' : '/1024/rank'">
        <div class="bottom-bar-right">
          <img v-if="isSignUp" src="@/assets/images/排行榜2.png" alt="" class="icon" />
          <div class="text" @click="handleRank">{{ isSignUp ? '排行榜' : '我要报名' }}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
const isFinal = ref(false)
setInterval(() => {
  isFinal.value = !isFinal.value
}, 1000)
const isSignUp = ref(false)
</script>

<style scoped lang="scss">
.wrap {
  .deadline {
    padding-top: 17px;
    height: 150px;
    font-family: PingFangSC-Medium;
    font-size: 28px;
    color: #ffffff;
    text-align: center;
    font-weight: 500;
    .text {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 40px;
      .time {
        background: #386cff;
        border-radius: 4px;
        width: 36px;
        height: 40px;
        line-height: 40px;
        font-family: PingFangSC-Semibold;
        font-size: 28px;
        color: #fff729;
        text-align: center;
        font-weight: 600;
        margin: 0 3px;
      }
    }
  }

  .main {
    padding-bottom: 24px;
    background: #f7f7f7;
    border-radius: 20px 20px 0 0;
    min-height: 792px;

    .people {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      width: 710px;
      height: 171px;
      position: relative;
      top: -70px;
      margin: 0 auto;
      background: #ffffff;
      box-shadow: 0px 2px 20px 0px rgba(110, 129, 149, 0.05);
      border-radius: 20px;
      margin-bottom: 14px;
      .line {
        width: 0;
        height: 48px;
        opacity: 0.4;
        border: 2px solid rgba(157, 185, 227, 1);
      }
      .number {
        font-family: PingFangSC-Semibold;
        font-size: 44px;
        color: #386eff;
        text-align: center;
        font-weight: 600;
        margin-bottom: 9px;
      }
      .number-right {
        color: #44a2f6;
      }
      .text {
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #869cac;
        font-weight: 400;
      }
    }

    .date-wrap {
      height: 213px;
      .title {
        width: 670px;
        height: 80px;
        margin: 0 auto 20px;
        position: relative;
        .bg {
          width: 670px;
          height: 80px;
          opacity: 0.3;
          background-image: linear-gradient(180deg, #389fff 0%, #386cff 100%);
          border-radius: 48px;
        }
        .current-bg {
          background-image: linear-gradient(180deg, #389fff 0%, #386cff 100%);
          border-radius: 48px;
          width: 343px;
          height: 80px;
          position: absolute;
          top: -10px;
          right: 317px;
          border: 10px solid #f7f7f7;
          &.to-right {
            right: -10px;
          }
        }
        .text {
          font-family: PingFangSC-Medium;
          font-size: 32px;
          color: #ffffff;
          text-align: center;
          font-weight: 500;
          position: absolute;
          top: 18px;
          left: 140px;
        }
        .text-right {
          left: 465px;
        }
      }
      .date {
        position: relative;
        p {
          font-family: PingFangSC-Regular;
          font-size: 24px;
          color: #333333;
          font-weight: 400;
        }
        .text-left {
          position: absolute;
          top: 0;
          left: 145px;
        }
        .text-right {
          position: absolute;
          right: 145px;
        }
        .not-current-text {
          opacity: 0.4;
        }
      }
    }

    .rule-wrap {
      background: #ffffff;
      border-radius: 20px;
      width: 710px;
      margin: 0 auto;
      .title {
        height: 127px;
        margin-left: 105px;
      }
      .rule {
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #333333;
        line-height: 44px;
        font-weight: 400;
        padding: 0 40px 130px;
      }
    }
  }

  .bottom-bar-wrap {
    height: 100px;
    position: fixed;
    bottom: 40px;
    left: 28px;
    .icon {
      width: 32px;
      height: 33px;
      margin-right: 12px;
    }
    .bottom-bar-left {
      display: flex;
      align-items: center;
      margin-top: 10px;
      padding-left: 40px;
      width: 693px;
      height: 80px;
      box-sizing: border-box;
      background: #ffffff;
      border: 1px solid rgba(237, 237, 237, 1);
      box-shadow: 0px 2px 10px 0px rgba(25, 44, 132, 0.1);
      border-radius: 53px;
      .text {
        font-family: PingFangSC-Semibold;
        font-size: 32px;
        color: #3a90ff;
        font-weight: 600;
        margin-right: 20px;
      }
      p {
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #999999;
        text-align: right;
        font-weight: 400;
      }
    }
    .bottom-bar-right {
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      position: absolute;
      right: 0;
      top: 0;
      width: 256px;
      height: 100px;
      background: url('@/assets/images/我要报名-按钮.png') no-repeat 0 0 / 100% auto;
      .icon {
        margin-right: 20px;
      }
      .text {
        font-family: PingFangSC-Semibold;
        font-size: 36px;
        color: #ffffff;
        text-align: center;
        font-weight: 600;
      }
    }
  }
}
</style>
