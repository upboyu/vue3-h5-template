<template>
  <div class="sign-up">
    <div class="title"></div>
    <van-form @submit="onSubmit" label-align="top" error-message-align="top">
      <div class="wrap">
        <div class="label">用户名<span class="require">*</span></div>
        <van-field
          v-model="username"
          name="user"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请输入用户名' }]"
          :border="false"
          class="field"
        />

        <div class="label">邮箱 <span class="require">*</span></div>
        <van-field
          v-model="email"
          name="email"
          placeholder="请输入邮箱"
          :rules="[{ required: true, message: '请输入邮箱' }]"
          :border="false"
          class="field"
        >
          <template #extra>
            <div class="extra">
              <div class="line"></div>
              @cfit.cn
            </div>
          </template>
        </van-field>

        <div class="label">密码<span class="require">*</span></div>
        <van-field
          v-model="password"
          name="password"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]"
          :border="false"
          class="field last"
        />
        <div class="comment">*此密码仅用于登录编程系统</div>
        <div class="comment">
          如以上采集信息有误，请报名后联系测试部徐淙荻修改 (电话：18192729715)
        </div>

        <van-button class="submit" round block type="primary" native-type="submit">
          我要报名
        </van-button>

        <div class="back" @click="handleBack">返回</div>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import useAppStore from '@/stores/app'
const appStore = useAppStore()

MessagePopup({
  type: 'success',
  title: '123',
  text: '您已报名成功，期待您的参与！ ',
})

const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const onSubmit = (values) => {
  console.log('submit', values)
}

function handleBack() {
  router.back()
}
</script>

<style scoped lang="scss">
.sign-up {
  position: relative;
  padding-top: 44px;
  padding-bottom: 30px;
  .title {
    width: 384px;
    height: 90px;
    margin-left: 183px;
    background: url('@/assets/images/报名信息title.png') no-repeat 0 0 / 100% auto;
    position: absolute;
    top: 0;
    z-index: 1;
  }
  .wrap {
    background: #ffffff;
    border-radius: 40px;
    margin-left: 30px;
    width: 690px;
    height: 885px;
    box-sizing: border-box;
    padding: 86px 40px 40px;
    .label {
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #333333;
      letter-spacing: 0;
      line-height: 43px;
      font-weight: 400;
      margin-bottom: 13px;
      .require {
        color: red;
        vertical-align: middle;
        line-height: 20px;
      }
    }
    .field {
      background: #ffffff;
      border: 1px solid rgba(204, 204, 204, 1);
      border-radius: 10px;
      margin-bottom: 40px;
      font-family: PingFangSC-Regular;
      .van-field__control {
        font-size: 28px;
        color: #999999;
        letter-spacing: 0;
        line-height: 44px;
        font-weight: 400;
      }
      .extra {
        font-family: MicrosoftYaHei;
        font-size: 28px;
        color: #999999;
        letter-spacing: 0.2px;
        line-height: 44px;
        font-weight: 400;
        display: flex;
        align-items: center;
        .line {
          box-sizing: border-box;
          width: 1px;
          height: 28px;
          border: 1px solid rgba(204, 204, 204, 1);
          margin: 0 20px;
        }
      }
      :deep() .van-field__error-message {
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
    .field.last {
      margin-bottom: 10px;
    }
    .comment {
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #999999;
      letter-spacing: 0;
      text-align: center;
      line-height: 29px;
      font-weight: 400;
      margin-bottom: 20px;
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
      margin: 0 auto 40px;
    }
    .back {
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #999999;
      font-weight: 400;
      text-align: center;
    }
  }
}
</style>
