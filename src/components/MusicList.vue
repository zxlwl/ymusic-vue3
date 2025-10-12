<script setup>
import { useMusicDataStore } from "../stores";
import { NList, NListItem, NIcon } from 'naive-ui'
import { TrashBin } from '@vicons/ionicons5'
import Text from './Text.vue'
const musicStore = useMusicDataStore();
</script>

<template>
    <n-list :hoverable="true" style="height: 100%;width: 100%;flex: 1;overflow: auto;">
        <n-list-item v-for="(item, index) in musicStore.musicList" :key="item.id" style="text-align: start;"
            @click="musicStore.playMusic(item)">
            <div
                :style="{ display: 'flex', justifyContent: 'space-between', width: '100%', fontWeight: index == musicStore.nowPlaying ? 'bold' : 'normal' }">
                {{ item.name }}
                <n-icon :component="TrashBin" color="red" />
            </div>
        </n-list-item>
    </n-list>
</template>
<style scoped>
.n-tab-pane {
    height: 100%;
}
</style>
