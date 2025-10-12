<script setup>
import { useMusicDataStore, useTemporaryStore, useUserStore } from '../stores'
import { NSplit, NFlex, NTabs, NTabPane } from 'naive-ui'
import MusicList from './MusicList.vue'
import MainWelcome from './MainWelcome.vue'
import MainSearchList from './MainSearchList.vue'
import PlayInterface from './PlayInterface.vue'
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
        </Transition>
        <Transition name="play-interface">
            <PlayInterface :style="{
                height: '100%',
                width: '100%',
                backgroundColor: 'red',
                transition: 'all 0.5s ease',
                backgroundColor: userStore.themeType === 'light' ? '#FAFAFC' : '#101014',
            }" v-if="temporaryStore.mainPlayInterface" />
        </Transition>
    </n-flex>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.play-interface-enter-active,
.play-interface-leave-active {
    transition: transform 0.5s ease;
}

.play-interface-enter-from,
.play-interface-leave-to {
    transform: translateY(100%);
}

.n-tabs {
    height: 100%;
}

.n-tab-pane {
    height: calc(100% - 33px);

    ::-webkit-scrollbar {
        display: none;
    }
}
</style>
