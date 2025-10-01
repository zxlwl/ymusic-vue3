import { defineStore } from "pinia";
export const PLAY_REPEAT_ONE = 1 as const  //单曲循环
export const PLAY_REPEAT_ALL = 2 as const //列表循环
export const PLAY_RANDOM = 3 as const //随机播放   
export type PlayType = typeof PLAY_REPEAT_ONE | typeof PLAY_REPEAT_ALL | typeof PLAY_RANDOM;
export type MusicData = {
    id: number,
    name: string,
    artist: string,
    album: string,
    duration: number,
    url: string,
    pic: string,
}
export const useMusicDataStore = defineStore("musicData", {
    state: (): {
        musicList: MusicData[],
        nowPlaying: number,
        playType: PlayType,
        voice: number
    } => ({
        musicList: [],
        nowPlaying: 0,
        playType: 1,
        voice: 100
    }),
    persist: {
        key: "musicData",
    },
    getters: {},
    actions: {
        setMusicList(musicList: MusicData[]) {
            this.musicList = musicList
        },
        setNowPlaying(nowPlaying: number) {
            this.nowPlaying = nowPlaying
        },
        setPlayType(playType: PlayType) {
            this.playType = playType
        },
        setVoive(voice: number) {
            this.voice = voice
        },
        addVoice(adds: number) {
            this.voice += adds
            this.voice >= 100 ? this.voice = 100 : this.voice <= 0 ? this.voice = 0 : null
        },
        addMusicListItem(musicListItem: MusicData) {
            this.musicList.push(musicListItem)
        },
    },
})
