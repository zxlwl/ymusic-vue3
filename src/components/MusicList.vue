<script setup>
import { useMusicDataStore } from "../stores";
import { NList, NListItem, NIcon } from 'naive-ui'
import { TrashBin } from '@vicons/ionicons5'
import Text from './Text.vue'
import { ref } from 'vue'
const musicStore = useMusicDataStore();
const hoveredIndex = ref(-1);
</script>

<template>
    <n-list :hoverable="true" style="height: 100%;width: 100%;flex: 1;overflow: auto;">
        <n-list-item v-for="(item, index) in musicStore.musicList" :key="item.id" style="text-align: start;"
            @click="musicStore.playMusic(item)" @mouseenter="hoveredIndex = index" @mouseleave="hoveredIndex = -1">
            <div
                :style="{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', fontWeight: index == musicStore.nowPlaying ? 'bold' : 'normal' }">
                {{ item.name }}
                <n-icon @click.stop="() => musicStore.removeMusic(index)" v-if="hoveredIndex === index"
                    :component="TrashBin" color="red" />
            </div>
        </n-list-item>
    </n-list>
</template>
