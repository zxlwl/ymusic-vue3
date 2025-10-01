<script setup>
import { useMusicDataStore, useTemporaryStore } from '../stores'
import { NSplit, NFlex, NTabs, NTabPane } from 'naive-ui'
import MusicList from './MusicList.vue'
import MainWelcome from './MainWelcome.vue'
import MainSearchList from './MainSearchList.vue'
const musicStore = useMusicDataStore()
const temporaryStore = useTemporaryStore()
</script>

<template>
    <n-flex vertical style="height: 100%;width: 100%;flex: 1;">
        <n-split :default-size=0.2 style="display: flex; height: 100%;width: 100%;flex: 1;">
            <template #1>

                <n-tabs v-model:value="temporaryStore.mainLeftShowType" justify-content="space-evenly">
                    <n-tab-pane label="控制" name="0">

                    </n-tab-pane>
                    <n-tab-pane label="播放列表" name="1">
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
    </n-flex>
</template>

<style scoped></style>
