<script setup lang="ts">

import { useTemporaryStore, useUserStore, useApiStore} from '../stores'
import { NInput, NIcon, NSwitch,useLoadingBar } from 'naive-ui'
import { Search } from '@vicons/ionicons5'
import Text from './Text.vue'

const temporaryStore = useTemporaryStore()
const userStore = useUserStore()
const apiStore = useApiStore()
const loadingBar = useLoadingBar()
//TODO: 主题切换失效
const onChangeSwitch = (value: boolean) => {
    userStore.setTheme(value ? 'dark' : 'light')
}
const SearchMusic = async (text: string) => {
    loadingBar.start()
    const res = await apiStore.search(text, 1, 15)
    if (res === 'error') {
        loadingBar.error()
        return 'error'
    }
    loadingBar.finish()
    temporaryStore.searchMusicList = res
    temporaryStore.mainShowType = 1
}
</script>

<template>
  <header class="header">
    <div class="header-brand">
      <Text>
        <span class="brand-text">Y-music</span>
      </Text>
    </div>
    <div class="header-search">
      <n-input
        v-model:value="temporaryStore.searchText"
        placeholder="搜索歌曲、歌手、专辑..."
        clearable
        round
        @keyup.enter="SearchMusic(temporaryStore.searchText)"
        class="search-input"
      />
      <button type="button" class="search-btn" @click="SearchMusic(temporaryStore.searchText)" aria-label="搜索">
        <n-icon :component="Search" :size="20" />
      </button>
    </div>
    <div class="header-actions">
      <n-switch
        :value="userStore.themeType === 'dark'"
        @update:value="(v: boolean) => onChangeSwitch(v)"
        size="medium"
        class="theme-switch"
      >
        <template #checked>深色</template>
        <template #unchecked>浅色</template>
      </n-switch>
    </div>
  </header>
</template>

<style scoped>
.header {
  height: 100%;
  width: 100%;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  background: transparent;
}

.header-brand .brand-text {
  font-size: 1.5rem;
  font-weight: 800;
  /* letter-spacing: -0.03em; */
  background: #73737357;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-color:black;
  /* filter: drop-shadow(0 2px 4px rgba(99, 102, 241, 0.2)); */
}

.header-search {
  flex: 1;
  max-width: 480px;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
}

.header-search :deep(.n-input) {
  --n-border-radius: 12px;
  background-color: var(--bg-primary);
  border: 1px solid transparent;
  transition: all 0.3s ease;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
}

.header-search :deep(.n-input:hover) {
  background-color: var(--bg-elevated);
  box-shadow: var(--shadow-sm);
}

.header-search :deep(.n-input.n-input--focus) {
  background-color: var(--bg-elevated);
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-soft), var(--shadow-sm);
}

.header-search :deep(.n-input__input-el) {
  padding-left: 12px;
  font-weight: 500;
}

.search-btn {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 12px;
  background: var(--bg-primary);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.search-btn:hover {
  background: var(--accent);
  color: white;
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.search-btn:active {
  transform: translateY(0);
}

.header-actions {
  display: flex;
  align-items: center;
}
</style>
