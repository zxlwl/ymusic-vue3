<script setup>
import { Api } from '@vicons/tabler';
import { useApiStore, useTemporaryStore } from '../stores'
import { NList, NListItem, NThing, NTag, NSpace, NPagination, useLoadingBar } from 'naive-ui'
const temporaryStore = useTemporaryStore()
const apiStore = useApiStore()
const loadingBar = useLoadingBar()
// const page = ref(temporaryStore.searchPage)
const changeSearchPage = async (page) => {
    loadingBar.start()
    const res = await apiStore.search(temporaryStore.searchText, page, 15)
    if (res === 'error') {
        loadingBar.error()
        return 'error'
    }
    loadingBar.finish()
    temporaryStore.searchMusicList = res
}
</script>
<template>
    <div style="height: 100%;width: 100%;display: flex;flex-direction: column;">
        <n-list style="overflow: auto; text-align: start;width: 100%;flex: 1;" :hoverable="true">
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
        <n-pagination @update:page="(page) => changeSearchPage(page)" style="width: 100%;"
            v-model:page="temporaryStore.searchPage" :page-count="100" size="large" show-quick-jumper show-size-picker
            :page-sizes="[15]" />
    </div>
</template>

<style scoped>
::-webkit-scrollbar {
    display: none;
}
</style>
