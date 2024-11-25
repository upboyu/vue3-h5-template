<!-- 
  基于 van-tree-select 的二次封装，主要功能如下：
    1.支持字段别名：即 tree-props 属性，例：:tree-props="{ text: 'title', id: 'departmentId' }"
    2.自动增加全选选项
    3.自动生成 label 字段，用于收起时的文字展示
    4.样式美化，参考大众点评
    5.保留原有API风格
-->

<template>
  <div class="root" :class="{ 'is-selected-all': activeIndex === 0 }">
    <van-tree-select
      v-model:main-active-index="activeIndex"
      v-model:active-id="activeId"
      :items="transformedItems"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup name="DualTreeSelect">
const props = defineProps({
  items: {
    type: Object,
  },
  'tree-props': {
    type: Object,
    default() {
      return { text: 'text', id: 'id' }
    },
  },
})
const { text: treePropsText, id: treePropsId } = props.treeProps
const { items } = toRefs(props)

const activeIndex = defineModel('mainActiveIndex')
const activeId = defineModel('activeId')

const transformedItems = computed(() => {
  return transformStructure(transformDepartments(items.value))
})

// 增加全选项，设置 lable
function transformDepartments(data) {
  const result = [
    {
      [treePropsText]: '部门不限',
      [treePropsId]: data.map((item) => item[treePropsId]).join(','),
      className: 'all',
    },
    ...data.map((item) => {
      return {
        ...item,
        children: [
          {
            [treePropsText]: `全部${item[treePropsText]}`,
            [treePropsId]:
              item[treePropsId] + ',' + item.children.map((child) => child[treePropsId]).join(','),
            label: item[treePropsText],
          },
          ...item.children.map((subItem) => {
            return {
              ...subItem,
              label: item[treePropsText] + '/' + subItem[treePropsText],
            }
          }),
        ],
      }
    }),
  ]
  return result
}
// 支持字段别名：即 tree-props 属性
function transformStructure(data) {
  return data.map((item) => {
    // 只保留接口数据中，对本组件有用的信息，防止字段名污染。
    const newItem = {
      label: item.label,
      className: item.className,
      text: item[treePropsText],
      id: item[treePropsId],
    }
    if (item.children) {
      newItem.children = transformStructure(item.children)
    }
    return newItem
  })
}
</script>

<style lang="scss" scoped>
.root {
  --van-sidebar-background: #fff;
  --van-sidebar-selected-background: #f9f9f9;
  --van-tree-select-nav-background: #fff;
  --van-tree-select-content-background: #f9f9f9;
  &.is-selected-all {
    --van-tree-select-content-background: #fff;
  }
  :deep() .van-tree-select__item {
    font-weight: normal;
  }
  :deep() .van-sidebar-item--select {
    color: var(--van-tree-select-item-active-color);
    font-weight: normal;
  }
  :deep() .van-sidebar-item--select.all {
    background-color: var(--van-sidebar-background);
  }
}
</style>
