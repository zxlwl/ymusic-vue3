<script setup>
import { useTemporaryStore } from '../stores'
import { NList, NListItem, NThing, NTag, NSpace } from 'naive-ui'
const temporaryStore = useTemporaryStore()
</script>
<template>
    <n-list style="text-align: start;height: 100%;width: 100%;flex: 1;" :hoverable="true">
        <n-list-item v-for="item in temporaryStore.searchMusicList" :key="item.id"
            @click="temporaryStore.playMusic(item)">
            <n-thing :title="item.name">
                <template #description>
                    <n-space size="small">
                        <n-tag size="small" type="info">{{ item.artist.join(',') }}</n-tag>
                        <n-tag size="small" type="info">{{ item.album }}</n-tag>
                    </n-space>
                </template>
                {{ item.id }}
            </n-thing>
        </n-list-item>
    </n-list>
</template>