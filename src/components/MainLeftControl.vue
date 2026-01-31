<script setup>
import { useMusicDataStore, useTemporaryStore } from '../stores'
import { watch, ref } from 'vue'
import { NIcon } from 'naive-ui'
import { Home, Search, Compass, Heart } from '@vicons/ionicons5'

const musicDataStore = useMusicDataStore()
const temporaryStore = useTemporaryStore()

const control = [
    { label: '首页', icon: Home },
    { label: '搜索', icon: Search },
    { label: '发现', icon: Compass },
    { label: '我的收藏', icon: Heart }
]
</script>

<template>
  <nav class="sidebar-nav">
    <button
      v-for="(item, index) in control"
      :key="index"
      type="button"
      class="nav-item"
      :class="{ active: index === temporaryStore.mainShowType }"
      @click="temporaryStore.mainShowType = index"
    >
      <n-icon :component="item.icon" size="20" class="nav-icon" />
      <span class="nav-label">{{ item.label }}</span>
    </button>
  </nav>
</template>

<style scoped>
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 12px;
  height: 100%;
  overflow: auto;
}

.nav-item {
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-secondary);
  font-size: 1rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-item:hover {
  background: var(--bg-elevated);
  color: var(--text-primary);
  transform: translateX(4px);
  box-shadow: var(--shadow-sm);
}

.nav-item.active {
  background: var(--accent);
  color: white;
  font-weight: 500;
  box-shadow: var(--shadow-md);
}

.nav-item.active .nav-icon {
    color: white;
}

.nav-icon {
    flex-shrink: 0;
    transition: transform 0.2s;
}

.nav-item:hover .nav-icon {
    transform: scale(1.1);
}

.nav-label {
    font-weight: 500;
}
</style>
