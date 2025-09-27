import { defineStore } from 'pinia'

export const useTemporaryStore = defineStore('temporary', {
    state: (): {
        searchText: string,
        searchMusicList: object,
        mainShowType: number,
    } => ({
        searchText: '',
        searchMusicList: {},
        mainShowType: 0,
    }),
})