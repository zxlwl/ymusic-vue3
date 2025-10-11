<script setup lang="ts">

import { useTemporaryStore, useUserStore, useApiStore } from '../stores'
import { NInput, NFlex, NIcon, NSwitch, useLoadingBar } from 'naive-ui'
import { Search } from '@vicons/ionicons5'
import Text from './Text.vue'

const temporaryStore = useTemporaryStore()
const userStore = useUserStore()
const apiStore = useApiStore()
const loadingBar = useLoadingBar()
//TODO: 主题切换失效
const onChangeSwitch = (value: boolean) => {
    userStore.setTheme(value ? 'dark' : 'light')
}
const SearchMusic = async (text: string) => {
    loadingBar.start()
    const res = await apiStore.search(text, 1, 10)
    if (res === 'error') {
        loadingBar.error()
        return 'error'
    }
    loadingBar.finish()
    temporaryStore.searchMusicList = res
    temporaryStore.mainShowType = 1
}
</script>

<template>
    <n-flex justify="space-between" style="height: 60px;width: 100%;padding: 5px;">
        <Text>
            <H3>Y-music</H3>
        </Text>
        <div style="display: flex; justify-content: center;align-items: center;">
            <n-input @keyup.enter="SearchMusic(temporaryStore.searchText)" placeholder="Search Text"
                v-model:value="temporaryStore.searchText" style="height: 60%;margin-right: 5px;"></n-input>
            <n-icon @click="SearchMusic(temporaryStore.searchText)"
                :color="userStore.themeType === 'light' ? '#000' : '#fff'" :component="Search" :size=20
                style="margin: 10px; cursor: pointer;" />
        </div>
        <div style="display: flex; justify-content: center;align-items: center;">
            <n-switch @update-value="(value: boolean) => onChangeSwitch(value)"
                :default-value="userStore.themeType === 'light'" :value="userStore.themeType === 'dark'"
                style="margin: 10px;">
                <template #checked>Dark</template>
                <template #unchecked>Light</template>
            </n-switch>
        </div>
    </n-flex>
</template>
