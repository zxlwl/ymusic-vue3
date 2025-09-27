<script setup>
import { useMusicDataStore } from "../stores";
import { NList, NListItem } from 'naive-ui'
import Text from './Text.vue'
const musicStore = useMusicDataStore();
</script>

<template>
    <n-list :hoverable="true" style="height: 100%;width: 100%;flex: 1;">
        <n-list-item v-for="item in musicStore.musicList" :key="item.id">
            {{ item.name }}
        </n-list-item>
        <template #header>
            <Text>
                <H3>音乐列表</H3>
            </Text>
        </template>
    </n-list>
</template>
