import { defineStore } from 'pinia'
import { useMusicDataStore, type MusicData } from './MusicData'
export const useTemporaryStore = defineStore('temporary', {
    state: (): {
        searchText: string,
        searchPage: number,
        searchMusicList: object,
        mainShowType: number,
        mainLeftShowType: number,
        mainPlayInterface: boolean,
        isPlay: boolean,
        controlIndex: number,
    } => ({
        searchText: '',
        searchPage: 1,
        searchMusicList: {},
        mainShowType: 0,
        mainLeftShowType: 0,
        mainPlayInterface: false,
        isPlay: false,
        controlIndex: 0,
    }),
    actions: {
        playMusic(item: object): void {
            const musicDataStore = useMusicDataStore()
            musicDataStore.musicList.push(item as MusicData)
            musicDataStore.playMusic(item as MusicData)
        }
    }
})