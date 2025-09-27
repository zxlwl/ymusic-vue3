<script setup lang="ts">
import Header from './components/Header.vue'
import Main from './components/Main.vue'
import Footers from './components/Footers.vue'
import { NConfigProvider, NFlex } from 'naive-ui'
import { useUserStore } from './stores'
// import { lightTheme } from 'naive-ui'
const userStore = useUserStore()

</script>

<template :style="{ width: '100%', height: '100%' }">
  <NConfigProvider :theme="userStore.theme"
    :style="{ width: '100%', height: '100%', transition: 'all 0.3s ', backgroundColor: userStore.theme.name == 'light' ? '#FFFFFF' : '#121212' }">
    <n-flex vertical style="height: 100%;width: 100%;flex: 1;">
      <Header />
      <Main />
      <Footers />
    </n-flex>
  </NConfigProvider>
</template>

<style scoped></style>
