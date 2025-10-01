<script setup>
import { NIcon, NImage, NFlex } from 'naive-ui'
import { useMusicDataStore } from '../stores'
const musicStore = useMusicDataStore()
</script>


<template>
    <n-flex justify="space-evenly">
        <div>
            <n-image :src="musicStore.musicData?.pic" style="width: 100px;height: 100px;"></n-image>
        </div>
        <div>

        </div>
    </n-flex>
</template>