<script setup lang="ts">
import Header from './components/Header.vue'
import Main from './components/Main.vue'
import Footers from './components/Footers.vue'
import { NConfigProvider, NLayout, NLayoutHeader, NLayoutContent, NLayoutFooter, lightTheme, darkTheme, NLoadingBarProvider } from 'naive-ui'
import { useUserStore } from './stores'
import { watchEffect } from 'vue'

const userStore = useUserStore()

watchEffect(() => {
  document.documentElement.setAttribute('data-theme', userStore.themeType === 'dark' ? 'dark' : 'light')
})
</script>

<template>
  <NConfigProvider
    :theme="userStore.themeType === 'light' ? lightTheme : darkTheme"
    class="app-root"
  >
    <n-loading-bar-provider>
      <n-layout class="app-layout">
        <n-layout-header class="app-header">
          <Header />
        </n-layout-header>
        <n-layout-content content-style="height:100%;padding: 20px;flex: 1;" class="app-content">
          <Main />
        </n-layout-content>
        <n-layout-footer class="app-footer">
          <Footers />
        </n-layout-footer>
      </n-layout>
    </n-loading-bar-provider>
  </NConfigProvider>
</template>

<style scoped>
.app-root {
  display: flex;
  width: 100%;
  height: 100%;
  transition: background-color 0.3s ease;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.app-layout {
  overflow: hidden;
  height: 100%;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: transparent;
}

.app-header {
  flex-shrink: 0;
  height: var(--header-height);
  border-bottom: 1px solid var(--border);
  background: var(--bg-secondary);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  box-shadow: var(--shadow-sm);
  z-index: 100;
}

.app-content {
  min-height: 0;
  flex: 1;
  position: relative;
}

.app-footer {
  flex-shrink: 0;
  height: var(--footer-height);
  border-top: 1px solid var(--border);
  background: var(--bg-secondary);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.05);
  z-index: 100;
}
</style>

<style>
.n-layout-scroll-container {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0 !important;
}
</style>