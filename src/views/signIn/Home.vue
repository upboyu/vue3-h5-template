<template>
  <div class="home">
    <img width="100%" height="auto" :src="bgImgUrl" />
    <vue-danmaku class="barrage" v-model:danmus="list" v-bind="config">
      <template v-slot:dm="{ danmu }">
        <div class="barrage-item-wrap">
          <div class="barrage-item" :class="{ self: danmu.id == 'self' }">{{ danmu.text }}</div>
        </div>
      </template>
    </vue-danmaku>
    <div class="sign-in">
      <div class="sign-in-inner">
        <van-button
          class="submit"
          :class="{ 'is-sign-in': isSignIn }"
          round
          block
          type="primary"
          native-type="submit"
          @click="handleClick"
          :disabled="isSignIn"
        >
          {{ isSignIn ? '您已签到' : '立即签到' }}
        </van-button>
        <router-link to="/sign-in/overview">
          <div class="text">已有 {{ signNum }} 人签到</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import vueDanmaku from 'vue3-danmaku'
import { downloadEventFile, getUserSignByCode, userSign, getUserSignList } from '@/api/signIn'
import useAppStore from '@/stores/app'
const appStore = useAppStore()

// 弹幕
const list = ref([])
const config = reactive({
  channels: 4, // 轨道数量，为0则弹幕轨道数会撑满容器
  useSlot: true, // 是否开启slot
  loop: true, // 是否开启弹幕循环
  speeds: pxToReal(187), // 弹幕速度，实际为弹幕滚动完一整屏的秒数，值越小速度越快
  top: 1, // 弹幕轨道间的垂直间距
  right: pxToReal(400), // 同一轨道弹幕的水平间距
  debounce: 1200, // 弹幕刷新频率（多少毫秒插入一条弹幕，建议不小于50）
  randomChannel: true, // 随机弹幕轨道
})

// 获取背景
const bgImgUrl = ref()
downloadEventFile().then((res) => {
  bgImgUrl.value = res
})

// 查询是否已签到
const isSignIn = ref(false)
getUserSignByCode().then((res) => {
  isSignIn.value = !!res
})

// 查询已签到人数，弹幕人名数据
const signNum = ref(0)
function getSignNum() {
  getUserSignList().then((res) => {
    setTimeout(() => {
      signNum.value = res.num
      list.value = [
        { id: 1, text: '张倩' },
        { id: 2, text: '李四' },
        { id: 3, text: '王五' },
        { id: 4, text: '李明年' },
        { id: 'self', text: '我自己' },
        { id: 5, text: '张海天' },
      ]
    }, 1000)
  })
}
getSignNum()

// 执行实际的签到接口
function handleSignIn() {
  userSign()
    .then(() => {
      isSignIn.value = true
      MessagePopup({
        type: 'success',
        title: '签到成功',
        text: '',
      })
      getSignNum()
    })
    .catch((res) => {
      MessagePopup({ type: 'error', title: '签到失败', text: res.message })
    })
}

// 点击签到按钮
function handleClick() {
  // 如果从二维码进来的，直接签到
  if (localStorage.getItem('source') === 'QRCode') {
    handleSignIn()
  }
  // 否则扫码签到
  else {
    const callback = (res) => {
      try {
        const { url, systemType } = JSON.parse(res)
        const { hash } = new URL(url)
        const [path, queryString] = hash.split('?')
        const params = new URLSearchParams(queryString)

        // 校验二维码是否正确
        if (
          systemType == '05' &&
          path === '#/sign-in' &&
          params.get('event') === localStorage.getItem('event')
        ) {
          handleSignIn()
        } else {
          MessagePopup({ type: 'error', title: '签到失败', text: '请扫描正确的二维码' })
        }
      } catch {
        // 捕获 res 非 JSON 时，此时为错误二维码
        MessagePopup({ type: 'error', title: '签到失败', text: '请扫描正确的二维码' })
      }
    }
    /**
     * 返回示例
     * callback('{"systemType":"05", "url":"http://172.16.41.232/refficiencyh5/#/sign-in?source=QRCode&event=1012"}')
     */
    dsBridge.call('event.scanAction', callback)
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding-bottom: 260px;
  .barrage {
    width: 100%;
    height: 280px;
    position: absolute;
    top: 250px;
    left: 0;
    .barrage-item-wrap {
      display: flex;
      align-items: center;
      .barrage-item {
        box-sizing: border-box;
        padding: 0 36.4px;
        text-shadow: none;
        min-width: 166.4px;
        height: 68.9px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(255, 255, 255, 0.67);
        border-radius: 35.1px;
        font-family: PingFangSC-Regular;
        font-size: 31.2px;
        color: #19adcb;
        letter-spacing: 0;
        font-weight: bold;

        &.self {
          border: 2.6px solid rgba(242, 255, 20, 1);
          background: none;
          font-family: PingFangSC-Semibold;
          color: #f2ff14;
        }
      }
    }
  }
  .sign-in {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    .sign-in-inner {
      box-sizing: border-box;
      padding: 0 0 40px;
      .submit {
        background:
          url('@/assets/images/signIn/按钮.png') no-repeat 0 0 / 100% auto,
          linear-gradient(
            124deg,
            var(--theme-background-color1) 0%,
            var(--theme-background-color2) 100%
          );
        width: 256px;
        height: 100px;
        font-family: PingFangSC-Semibold;
        font-size: 36px;
        color: #ffffff;
        font-weight: 600;
        border: none;
        margin: 0 auto 40px;
        &.is-sign-in {
          background: #b9d6dc;
          border-radius: 53px;
        }
      }
      .text {
        background-color: #fff;
        border-radius: 15px;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #11cad8;
        text-align: center;
        font-weight: 400;
        line-height: 40px;
      }
    }
  }
}
</style>
