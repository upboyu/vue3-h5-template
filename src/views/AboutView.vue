<template>
  <div class="wrap">
    <van-dropdown-menu class="dept-dropdown">
      <van-dropdown-item ref="itemRef" @open="showDropdown = true" @close="showDropdown = false">
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
    <van-cell>
      <van-button type="primary" @click="handleShowMessage('success')">成功弹窗</van-button>
      <van-button type="primary" @click="handleShowMessage('error')">失败弹窗</van-button>
    </van-cell>
  </div>
</template>

<script setup>
function handleShowMessage(params) {
  params === 'success'
    ? MessagePopup({ type: 'success', title: '成功', text: '说明文字，支持html格式字符串' })
    : MessagePopup({ type: 'error', title: '失败', text: '说明文字，支持html格式字符串' })
}

/**
 * 选择部门
 */
const deptDropdown = reactive({
  label: '部门不限',
  activeIndex: 0,
  activeId: undefined,
})
const items = [
  {
    title: '北京',
    departmentId: '1',
    children: [
      { title: '研发一部', departmentId: '3' },
      { title: '研发二部', departmentId: '9' },
    ],
  },
  {
    title: '成都',
    departmentId: '2',
    children: [
      { title: '研发二部', departmentId: '0' },
      { title: '研发3部', departmentId: '22' },
    ],
  },
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
</script>

<style lang="scss" scoped>
.wrap {
  padding-top: 120px;
  .van-button {
    margin-right: 20px;
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
</style>
