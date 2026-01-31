<script setup>
import { useMusicDataStore, useTemporaryStore, useUserStore } from '../stores'
import { NSplit, NFlex, NTabs, NTabPane } from 'naive-ui'
import MusicList from './MusicList.vue'
import MainWelcome from './MainWelcome.vue'
import MainSearchList from './MainSearchList.vue'
import PlayInterface from './PlayInterface.vue'
import MainLeftControl from './MainLeftControl.vue'
const musicStore = useMusicDataStore()
const temporaryStore = useTemporaryStore()
const userStore = useUserStore()
</script>

<template>
    <n-flex class="a" vertical style="height: 100%;width: 100%;flex: 1;position: relative;">
        <Transition>
            <n-split v-if="!temporaryStore.mainPlayInterface" :default-size=0.2
                style="display: flex; height: 100%;width: 100%;flex: 1;">
                <template #1>
                    <n-tabs v-model:value="temporaryStore.mainLeftShowType" justify-content="space-evenly">
                        <n-tab-pane label="控制" :name="0">
                            <MainLeftControl style="height: 100%;width: 100%;flex: 1;">
                            </MainLeftControl>
                        </n-tab-pane>
                        <n-tab-pane label="播放列表" :name="1">
                            <MusicList style="height: 100%;width: 100%;flex: 1;">
                            </MusicList>
                        </n-tab-pane>
                    </n-tabs>
                </template>
                <template #2>
                    <MainWelcome v-if="temporaryStore.mainShowType == 0" style="height: 100%;width: 100%;" />
                    <MainSearchList v-else-if="temporaryStore.mainShowType == 1"
                        style="overflow: auto;max-height: 100vh;height: 100%;width: 100%;" />
                </template>
            </n-split>
        </Transition>
        <Transition name="play-interface">
            <PlayInterface class="play-interface-panel" v-if="temporaryStore.mainPlayInterface" />
        </Transition>
    </n-flex>
</template>

<style scoped>
.a {
  height: 100%;
  width: 100%;
  flex: 1;
  position: relative;
  background: var(--bg-primary);
}

.play-interface-panel {
  height: 100%;
  width: 100%;
  background: var(--bg-elevated);
  border-radius: var(--radius) var(--radius) 0 0;
  box-shadow: 0 -4px 24px var(--shadow-md);
  transition: all 0.4s ease;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.play-interface-enter-active,
.play-interface-leave-active {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.play-interface-enter-from,
.play-interface-leave-to {
  transform: translateY(100%);
}

:deep(.n-split-pane-1) {
  background: var(--bg-secondary);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border);
}

:deep(.n-split-pane-2) {
  background: var(--bg-secondary);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border);
  overflow: hidden;
}

.n-tabs {
  height: 100%;
  padding: 0 8px;
}

:deep(.n-tabs-tab-list) {
  border-bottom: 1px solid var(--border);
  margin-bottom: 8px;
}

:deep(.n-tab-pane) {
  height: calc(100% - 48px);
  padding: 0;
}

:deep(.n-tab-pane) ::-webkit-scrollbar {
  display: none;
}
</style>
