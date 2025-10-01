<script setup lang="ts">
import Header from './components/Header.vue'
import Main from './components/Main.vue'
import Footers from './components/Footers.vue'
import { NConfigProvider, NLayout, NLayoutHeader, NLayoutContent, NLayoutFooter, lightTheme, darkTheme } from 'naive-ui'
import { useUserStore } from './stores'
const userStore = useUserStore()

</script>

<template :style="{ width: '100%', height: '100%' }">
  <NConfigProvider :theme="userStore.themeType == 'light' ? lightTheme : darkTheme"
    :style="{ display: 'flex', width: '100%', height: '100%', transition: 'all 0.3s ', backgroundColor: userStore.themeType === 'light' ? '#FFFFFF' : '#121212' }">
    <!-- <n-flex vertical style="height: 100%;width: 100%;flex: 1;">
      <Header />
      <Main />
      <Footers />
    </n-flex> -->
    <n-layout style="overflow: hidden; height: 100%;width: 100%;flex: 1;display: flex;flex-direction: column;">
      <n-layout-header>
        <Header />
      </n-layout-header>
      <n-layout-content content-style="height:100%;padding: 24px;flex: 1;">
        <Main />
      </n-layout-content>
      <n-layout-footer>
        <Footers />
      </n-layout-footer>
    </n-layout>
  </NConfigProvider>
</template>

<style>
.n-layout-scroll-container {
  display: flex;
  flex-direction: column;
  /* 去除滑动条(目前不知道为什么会出现滑动条 fuck css) */
  overflow: hidden;
  /* 由于组件库padding写在行内,所以添加 !important 覆盖 */
  padding: 0 !important;
}
</style>