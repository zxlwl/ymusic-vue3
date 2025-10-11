import { defineStore } from 'pinia'
import { useMusicDataStore, type MusicData } from './MusicData'
export const useTemporaryStore = defineStore('temporary', {
    state: (): {
        searchText: string,
        searchMusicList: object,
        mainShowType: number,
        mainLeftShowType: number,
        mainPlayInterface: boolean,
        isPlay: boolean,
    } => ({
        searchText: '',
        searchMusicList: {},
        mainShowType: 0,
        mainLeftShowType: 0,
        mainPlayInterface: false,
        isPlay: false,
    }),
    actions: {
        playMusic(item: object): void {
            console.log(item)
            const musicDataStore = useMusicDataStore()
            musicDataStore.musicList.push(item as MusicData)
            musicDataStore.playMusic(item as MusicData)
        }
    }
})