<script setup lang="ts">
import { useTemporaryStore } from '../stores'
import { NTabs, NTabPane } from 'naive-ui'
const temporaryStore = useTemporaryStore()
</script>

<template>
    <n-tabs v-model:value="temporaryStore.mainLeftShowType" style="margin-bottom: 10px;">
        <n-tab-pane label="控制" name="0"></n-tab-pane>
        <n-tab-pane label="播放列表" name="1"></n-tab-pane>
    </n-tabs>
</template>
