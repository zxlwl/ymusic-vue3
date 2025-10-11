<script setup>
import { useMusicDataStore } from "../stores";
import { NList, NListItem, NIcon } from 'naive-ui'
import { TrashBin } from '@vicons/ionicons5'
import Text from './Text.vue'
const musicStore = useMusicDataStore();
</script>

<template>
    <n-list :hoverable="true" style="height: 100%;width: 100%;flex: 1;">
        <n-list-item v-for="item in musicStore.musicList" :key="item.id" style="text-align: start;"
            @click="musicStore.playMusic(item)">
            <div style="display: flex;justify-content:space-between;width: 100%;">
                {{ item.name }}
                <n-icon :component="TrashBin" color="red" />
            </div>
        </n-list-item>
    </n-list>
</template>
