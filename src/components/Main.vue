<script setup>
import { useMusicDataStore } from '../stores/MusicData'
import { NSplit } from 'naive-ui'
import MusicList from './MusicList.vue'
const musicStore = useMusicDataStore()
</script>

<template>
    <n-split :default-size=0.2 style="height: 100%;width: 100%;flex: 1;">
        <template #1>
            <MusicList style="height: 100%;width: 100%;flex: 1;"></MusicList>
        </template>
        <template #2>

        </template>
    </n-split>
</template>

<style scoped></style>
