<script setup>
import { NIcon, NImage, NFlex, NList, NListItem } from 'naive-ui'
import { useMusicDataStore, useTemporaryStore } from '../stores'
import { watch, ref } from 'vue'
const musicDataStore = useMusicDataStore()
const temporaryStore = useTemporaryStore()
const control = ref(['首页', '搜索', '发现', '我的收藏'])
</script>

<template>
    <n-list :hoverable="true" style="height: 100%;width: 100%;flex: 1;overflow: auto;">
        <n-list-item @click="temporaryStore.mainShowType = index" v-for="(item, index) in control" :key="index"
            :style="{ textAlign: 'center', fontWeight: index == temporaryStore.mainShowType ? 'bold' : 'normal' }">
            {{ item }}
        </n-list-item>
    </n-list>
</template>