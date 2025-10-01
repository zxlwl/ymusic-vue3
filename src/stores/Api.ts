import { defineStore } from 'pinia'
import type { MusicData } from '../stores/MusicData'
export const useApiStore = defineStore('api', {
    state: (): {
        api: string,
        searchMusicData: object,
        musicData: MusicData | object,
    } => ({
        api: 'http://www.lihouse.xyz/coco_widget/music_resource/',
        searchMusicData: {},
        musicData: {},
    }),
    actions: {
        setApi(api: string) {
            this.api = api
        },
        async search(key: string, page: number, size: number) {
            const res = await fetch(`${this.api}info?key=${key}&page=${page}&limit=${size}`)
            if (res.ok) {
                const data = await res.json()
                if (data.status === true) {
                    this.searchMusicData = data['song_data']
                    return data['song_data']
                }
                return 'error'
            }
            return 'error'
        },
        async getMusicData(id: number) {
            const res = await fetch(`${this.api}id/${id}`)
            if (res.ok) {
                const data = await res.json()
                if (data.status === true) {
                    this.musicData = data['song_data']
                    return data['song_data']
                }
                return 'error'
            }
            return 'error'
        },
        // splitlyric(lyric: string) {
        //     const lines = lyric.split('\n')
        //     const lyrics = []
        //     for (const line of lines) {
        //         if (line.length > 0) {
        //             lyrics.push(line)
        //         }
        //     }
        //     return lyrics
        // }

    }
})