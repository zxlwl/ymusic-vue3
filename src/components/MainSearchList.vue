<script setup>
import { Api } from '@vicons/tabler';
import { useApiStore, useTemporaryStore } from '../stores'
import { NTag, NSpace, NPagination, useLoadingBar, NEmpty, NIcon } from 'naive-ui'
import { Search } from '@vicons/ionicons5'

const temporaryStore = useTemporaryStore()
const apiStore = useApiStore()
const loadingBar = useLoadingBar()

const changeSearchPage = async (page) => {
    loadingBar.start()
    const res = await apiStore.search(temporaryStore.searchText, page, 15)
    if (res === 'error') {
        loadingBar.error()
        return 'error'
    }
    loadingBar.finish()
    temporaryStore.searchMusicList = res
}
</script>

<template>
  <div class="search-list-container">
    <div v-if="!temporaryStore.searchMusicList || temporaryStore.searchMusicList.length === 0" class="empty-state">
        <n-empty description="暂无搜索结果">
            <template #icon>
                <n-icon :component="Search" />
            </template>
        </n-empty>
    </div>
    
    <div v-else class="search-list">
      <div class="search-results">
        <div
          v-for="item in temporaryStore.searchMusicList"
          :key="item.id"
          class="search-item"
          @click="temporaryStore.playMusic(item)"
        >
          <div class="search-item-main">
            <span class="search-item-name">{{ item.name }}</span>
            <div class="search-item-meta">
               <span class="meta-text artist">{{ Array.isArray(item.artist) ? item.artist.join(', ') : item.artist }}</span>
               <span class="meta-divider" v-if="item.album">•</span>
               <span class="meta-text album" v-if="item.album">{{ item.album }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="search-pagination">
        <n-pagination
          v-model:page="temporaryStore.searchPage"
          :page-count="100"
          size="medium"
          show-quick-jumper
          show-size-picker
          :page-sizes="[15]"
          @update:page="(page) => changeSearchPage(page)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-list-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.empty-state {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.search-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.search-results {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.search-item {
  padding: 16px 20px;
  border-radius: var(--radius);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--bg-elevated);
  border: 1px solid transparent;
}

.search-item:hover {
  background: var(--bg-elevated);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--accent-soft);
}

.search-item-main {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.search-item-name {
  font-weight: 600;
  font-size: 1.05rem;
  color: var(--text-primary);
}

.search-item-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.meta-divider {
    color: var(--text-tertiary);
    font-size: 0.8em;
}

.search-pagination {
  flex-shrink: 0;
  padding: 16px 0;
  display: flex;
  justify-content: center;
  background: var(--bg-primary); /* Ensure pagination has background if overlaying */
  border-top: 1px solid var(--border);
}
</style>
