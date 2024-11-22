<template>
  <div class="wrap">
    <div class="main-title">签到统计</div>
    <div class="main">
      <div class="title">
        <p class="title-left">
          已签到 <span class="num">{{ 8 }}</span> 人
        </p>
        <van-dropdown-menu class="dept-dropdown">
          <van-dropdown-item
            ref="itemRef"
            @open="showDropdown = true"
            @close="showDropdown = false"
          >
            <template #title>
              <div class="title-right">
                <div>
                  {{ deptDropdown.label }}
                </div>
                <img
                  src="@/assets/images/下拉.png"
                  alt=""
                  class="dropArrow"
                  :class="{ isShow: showDropdown }"
                />
              </div>
            </template>
            <template #default>
              <DualTreeSelect
                v-model:main-active-index="deptDropdown.activeIndex"
                v-model:active-id="deptDropdown.activeId"
                @click-nav="handleClick"
                @click-item="handleClick"
                :items="items"
                :tree-props="{ text: 'title', id: 'departmentId' }"
              />
            </template>
          </van-dropdown-item>
        </van-dropdown-menu>
      </div>
      <div class="header">
        <p class="header-left">姓名</p>
        <p class="header-right">签到时间</p>
      </div>
      <div class="list">
        <van-list
          v-model:loading="loading"
          v-model:error="error"
          :finished="finished"
          finished-text="没有更多了"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
        >
          <SignInOverviewItem v-for="item in list" :key="item" />
        </van-list>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * 列表展示
 */
const list = ref([])
const loading = ref(false)
const error = ref(false)
const finished = ref(false)

const onLoad = () => {
  setTimeout(() => {
    new Promise((resolve, reject) => {
      resolve({
        dataList: [1]
      })
    })
      .then((res) => {
        list.value = [...list.value, ...res.dataList]

        // 数据全部加载完成
        if (list.value.length >= 3) {
          finished.value = true
        }
      })
      .catch((res) => {
        if (res.returnCode && list.value.length == 0) {
          finished.value = true
        } else {
          error.value = true
        }
      })
      .finally(() => {
        // 加载状态结束
        loading.value = false
      })
  }, 1000)
}

/**
 * 选择部门
 */
const deptDropdown = reactive({
  label: '部门不限',
  activeIndex: 0,
  activeId: undefined
})
const items = [
  {
    title: '北京',
    departmentId: '1',
    children: [
      { title: '研发一部', departmentId: '3' },
      { title: '研发二部', departmentId: '9' }
    ]
  },
  {
    title: '成都',
    departmentId: '2',
    children: [
      { title: '研发二部', departmentId: '0' },
      { title: '研发3部', departmentId: '22' }
    ]
  }
]

function handleClick(params) {
  if (params === 0) {
    deptDropdown.label = '部门不限'
    deptDropdown.activeId = undefined
    closeDeptDropdown()
  } else if (params.id) {
    deptDropdown.label = params.label
    closeDeptDropdown()
  }
}
const itemRef = ref(null)
const showDropdown = ref(false)
const closeDeptDropdown = () => {
  itemRef.value.toggle()
}

watch(
  () => deptDropdown.activeId,
  () => {
    list.value = []
    loading.value = true
    finished.value = false
    onLoad()
  }
)
</script>

<style lang="scss" scoped>
.wrap {
  height: 100%;
  padding-top: 107px;
  box-sizing: border-box;
  background: linear-gradient(
      0deg,
      var(--theme-background-color1) 25%,
      var(--theme-background-color2) 100%
    )
    no-repeat 0 0 / 750px 792px;
  display: flex;
  flex-direction: column;
  .main-title {
    font-family: PingFangSC-Medium;
    font-size: 36px;
    color: #fff;
    letter-spacing: 0;
    text-align: center;
    line-height: 50px;
    font-weight: 500;
    margin-bottom: 30px;
  }
  .main {
    flex-grow: 1;
    overflow: hidden;
    background: #ffffff;
    border-radius: 20px 20px 0px 0px;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    .title {
      position: relative;
      height: 82px;
      margin-bottom: 20px;
      .title-left {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99;
        margin-left: 60px;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #c8c8c8;
        letter-spacing: 0;
        line-height: 82px;
        font-weight: 400;
        .num {
          color: #10cad8;
        }
      }
      .dept-dropdown {
        // reset
        :deep() .van-dropdown-menu__bar {
          height: 82px;
          justify-content: right;
          box-shadow: none;
          .van-dropdown-menu__item {
            flex: none;
            .van-dropdown-menu__title:after {
              display: none;
            }
          }
          .van-dropdown-menu__title {
            padding: 0;
          }
        }

        .title-right {
          font-family: PingFangSC-Regular;
          font-size: 24px;
          color: #2f3036;
          letter-spacing: 0;
          text-align: right;
          line-height: 82px;
          font-weight: 400;
          display: flex;
          align-items: center;
          .dropArrow {
            width: 42px;
            height: 42px;
            margin-right: 60px;
            margin-left: 20px;
            transform: rotate(180deg);
            &.isShow {
              transform: rotate(0deg);
            }
          }
        }
      }
    }
    .header {
      display: flex;
      height: 32px;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #c8c8c8;
      letter-spacing: 0;
      line-height: 32px;
      font-weight: 400;
      margin-bottom: -10px;
      padding-bottom: 10px;
      background-color: #fff;
      z-index: 9;
      .header-left {
        margin-left: 162px;
      }
      .header-right {
        margin-left: 233px;
      }
    }
    .list {
      flex: 1;
      overflow: auto;
    }
  }
}
</style>
