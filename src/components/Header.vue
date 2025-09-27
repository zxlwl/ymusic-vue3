<script setup lang="ts">

import { useTemporaryStore, useUserStore, useApiStore } from '../stores'
import { NInput, NFlex, NIcon, NSwitch, darkTheme, lightTheme } from 'naive-ui'
import { Search } from '@vicons/ionicons5'
import Text from './Text.vue'

const temporaryStore = useTemporaryStore()
const userStore = useUserStore()
const apiStore = useApiStore()
const onChangeSwitch = (value: boolean) => {
    console.log(value)
    userStore.theme = (value ? darkTheme : lightTheme)
}
const SearchMusic = async (text: string) => {
    const res = await apiStore.search(text, 1, 10)
    if (res === 'error') {
        return 'error'
    }
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
                :color="userStore.theme.name == 'light' ? '#000' : '#fff'" :component="Search" :size=20
                style="margin: 10px;" />
        </div>
        <div style="display: flex; justify-content: center;align-items: center;">
            <n-switch @update-value="(value: boolean) => onChangeSwitch(value)"
                :v-model:value="userStore.theme == darkTheme" style="margin: 10px;">
                <template #checked>Dark</template>
                <template #unchecked>Light</template>
            </n-switch>
        </div>
    </n-flex>
</template>
