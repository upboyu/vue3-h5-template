<template>
  <RouterView />
</template>

<script setup>
import { getEventByCode } from '@/api/signIn'
import useAppStore from '@/stores/app'
const appStore = useAppStore()

getEventByCode().finally((res) => {
  appStore.setTheme(res?.theme)
})
</script>

<style lang="scss" scoped></style>
