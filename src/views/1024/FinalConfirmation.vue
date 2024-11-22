<template>
  <div class="home">
    <div class="bg"></div>
    <div class="form-wrap">
      <div class="title"></div>
      <div class="form-inner">
        <div class="description">
          恭喜您成功在初赛晋级前50名，这是对您不懈努力与卓越表现的最好证明！接下来，请继续保持这份热情与专注，向更高的目标迈进。前方是更加激烈的竞争，但也是展现您真正实力与潜力的舞台。愿您能够乘胜追击，不断突破自我，最终站在更加辉煌的领奖台上，收获属于您的荣耀与辉煌！加油，我们期待您更加精彩的表现！
        </div>
        <div v-if="!confirmedType" class="confirmation">
          <div class="confirmation-title">您是否继续参加后续比赛！</div>
          <div class="confirmation-button">
            <van-button
              class="disagree"
              round
              block
              type="primary"
              native-type="submit"
              @click="handleConfirmation('N')"
            >
              否
            </van-button>
            <van-button
              class="submit"
              round
              block
              type="primary"
              native-type="submit"
              @click="handleConfirmation('Y')"
            >
              是
            </van-button>
            <ReasonedConfirmation
              v-model:show="showConfirmation"
              :confirmationType="confirmationType"
              :title="confirmationType === 'Y' ? '温馨提示' : '拒绝原因'"
              :message="confirmationType === 'Y' ? '您将参加决赛，点击提交报名结果！' : undefined"
              :showReasonField="confirmationType === 'N'"
              @confirm="handleConfirm"
            />
          </div>
        </div>
        <div v-else class="confirmed-display">
          <div class="confirmed-display-title" :class="{ red: confirmedType === 'N' }">
            <div v-if="confirmedType === 'Y'">
              您已确认参加后续比赛，请与10月24日 <br />准时参加比赛。
            </div>
            <div v-else>您已拒绝参加后续比赛！</div>
          </div>
          <div class="confirmed-display-footer">
            如有疑问请联系测试部徐淙荻：<br />
            (电话：18192729715)
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const showConfirmation = ref(false)
const confirmationType = ref() // 用户是否同意继续比赛，当前状态，用于控制弹窗样式切换
const confirmedType = ref() // 用户是否同意继续比赛，接口状态

function handleConfirmation(params) {
  confirmationType.value = params
  showConfirmation.value = true
}

function handleConfirm(reason) {
  console.log(confirmationType.value)
  console.log(reason)
  confirmedType.value = confirmationType.value
}
</script>
<style scoped lang="scss">
.home {
  min-height: 100%;
  background:
    url('@/assets/images/home_bg.png') no-repeat 0 0 / 100% auto,
    #1a43bb;
  .bg {
    height: 665px;
  }
  .form-wrap {
    position: relative;
    padding-top: 44px;
    padding-bottom: 30px;
    .title {
      width: 384px;
      height: 90px;
      margin-left: 183px;
      background: url('@/assets/images/1024/成功晋级title.png') no-repeat 0 0 / 100% auto;
      position: absolute;
      top: 0;
      z-index: 1;
    }
    .form-inner {
      background: #ffffff;
      border-radius: 40px;
      margin-left: 30px;
      width: 690px;
      box-sizing: border-box;
      padding: 86px 40px 0;
      .description {
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #333333;
        letter-spacing: 0;
        line-height: 55px;
        font-weight: 400;
        padding-bottom: 80px;
        text-indent: 2em;
      }
      .confirmation {
        .confirmation-title {
          font-family: PingFangSC-Medium;
          font-size: 32px;
          color: #333333;
          letter-spacing: 0;
          text-align: center;
          line-height: 55px;
          font-weight: 500;
          margin-bottom: 60px;
        }
        .confirmation-button {
          padding-left: 20px;
          display: flex;
          padding-bottom: 120px;
          .disagree {
            width: 256px;
            height: 100px;
            background: #f5f5f5;
            border-radius: 53px;
            font-family: PingFangSC-Semibold;
            font-size: 36px;
            color: #999999;
            text-align: center;
            font-weight: 600;
            border: none;
            margin-right: 58px;
          }
          .submit {
            width: 256px;
            height: 100px;
            background: url('@/assets/images/我要报名-按钮.png') no-repeat 0 0 / 100% auto;
            font-family: PingFangSC-Semibold;
            font-size: 36px;
            color: #ffffff;
            font-weight: 600;
            border: none;
          }
        }
      }
      .confirmed-display {
        padding-bottom: 88px;
        .confirmed-display-title {
          font-family: PingFangSC-Medium;
          font-size: 32px;
          color: #3a90ff;
          letter-spacing: 0;
          text-align: center;
          line-height: 55px;
          font-weight: 500;
          margin-bottom: 46px;
          &.red {
            color: #ff1414;
          }
        }
        .confirmed-display-footer {
          font-family: PingFangSC-Regular;
          font-size: 28px;
          color: #999999;
          letter-spacing: 0;
          text-align: center;
          line-height: 45px;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
