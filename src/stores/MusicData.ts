import { defineStore } from "pinia";
import { useApiStore } from "./Api";
import { ref } from "vue";
export const PLAY_REPEAT_ONE = 1 as const  //单曲循环
export const PLAY_REPEAT_ALL = 2 as const //列表循环
export const PLAY_RANDOM = 3 as const //随机播放   
export type PlayType = typeof PLAY_REPEAT_ONE | typeof PLAY_REPEAT_ALL | typeof PLAY_RANDOM;
export const audio = ref<HTMLAudioElement>(new Audio())
export type MusicData = {
    id: number,
    name: string,
    artist: string,
    album: string,
    duration: number,
    url: string,
    pic: string,
    lyric: string[],
}
export const useMusicDataStore = defineStore("musicData", {
    state: (): {
        musicList: MusicData[],
        nowPlaying: number,
        playType: PlayType,
        voice: number,
        // audio: HTMLAudioElement,
        isPlaying: boolean,
        nowPlayingData: { lyric: string },
        lyric: string[],
        timerContainer: ReturnType<typeof setTimeout>[],
        nowLyricIndex: number,
    } => ({
        musicList: [],
        nowPlaying: 0,
        playType: 1,
        voice: 100,
        // audio: new Audio(),
        isPlaying: false,
        nowPlayingData: { lyric: '' },
        lyric: [],
        timerContainer: [],
        nowLyricIndex: 0,
    }),
    getters: {
        getSeconds: () => audio.value.currentTime
    },

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
        async playMusic(musicData: MusicData) {
            this.clearAllTimers();
            this.nowPlaying = this.musicList.findIndex(item => item.id === musicData.id)
            this.isPlaying = true
            const apiStore = useApiStore()
            const res = await apiStore.getMusicData(musicData.id)
            this.splitlyric(res.lyric)
            this.nowPlayingData = res
            audio.value.src = res.url
            audio.value.play()
            // setTimeout(() => {
            //     this.resetLyric(5000)
            //     audio.value.currentTime = 5;
            // }, 2500)
        },
        splitlyric(lyric: string) {
            const lines = lyric.split('\n')
            const lyrics = []
            const timeReg = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/g;
            let num = 0
            for (const line of lines) {
                if (line.length > 0) {
                    lyrics.push(line.split(']')[1])
                    const time = line.match(timeReg)
                    // console.log(time);
                    if (time) {
                        for (const t of time) {
                            const match = t.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\]/);
                            if (match) {
                                const minutes = parseInt(match[1], 10);
                                const seconds = parseInt(match[2], 10);
                                const milliseconds = match[3].length === 2 ? parseInt(match[3], 10) * 10 : parseInt(match[3], 10);
                                // console.log(minutes, seconds, milliseconds);
                                const totalSeconds = (minutes * 60 + seconds) * 1000 + milliseconds;
                                // console.log(`转化后的时间(秒): ${totalSeconds}`);
                                // 建立一个存储定时器的容器

                                // 为每个时间设置一个定时器，并存储于容器中
                                this.timerContainer.push(setTimeout(() => {
                                    // console.log(`触发时间: ${totalSeconds} ms`);
                                    this.pushlyric(line.split(']')[1], totalSeconds, num)
                                    num++
                                }, totalSeconds));
                            }
                        }
                    }
                }

            }
            this.lyric = lyrics
        },
        resetLyric(currentTimeMs: number = 0) {
            // 清空所有现有定时器
            this.clearAllTimers();

            // 检查当前歌曲是否有歌词
            if (!this.nowPlayingData?.lyric) return;

            const lines = this.nowPlayingData.lyric.split('\n');
            const timeReg = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/g;
            let num = 0;

            for (const line of lines) {
                if (line.length > 0) {
                    const time = line.match(timeReg);
                    if (time) {
                        for (const t of time) {
                            const match = t.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\]/);
                            if (match) {
                                const minutes = parseInt(match[1], 10);
                                const seconds = parseInt(match[2], 10);
                                const milliseconds = match[3].length === 2 ? parseInt(match[3], 10) * 10 : parseInt(match[3], 10);
                                const totalSeconds = (minutes * 60 + seconds) * 1000 + milliseconds;

                                // 计算歌词时间与当前时间的差值
                                const timeDiff = totalSeconds - currentTimeMs;

                                // 只处理未来的歌词（时间差大于0）
                                if (timeDiff > 0) {
                                    // console.log(`处理未来歌词: ${line}, 时间差: ${timeDiff}ms`);
                                    // 为未来的歌词添加计时器
                                    const timerId = setTimeout(() => {
                                        // console.log(`触发时间: ${totalSeconds} ms`);
                                        this.pushlyric(line.split(']')[1], totalSeconds, num);
                                        num++;
                                    }, timeDiff);

                                    // 保存定时器ID以便后续清除
                                    this.timerContainer.push(timerId);
                                }
                                else {
                                    num++
                                }
                            }
                        }
                    }
                }
            }
        },

        // 清空所有定时器的辅助方法
        clearAllTimers() {
            // 清除所有现有定时器
            while (this.timerContainer.length > 0) {
                const timerId = this.timerContainer.pop();
                if (timerId) {
                    clearTimeout(timerId);
                }
            }
        },
        pushlyric(lyric: string, time: number, num: number) {
            this.nowLyricIndex = num
            console.log(lyric, time, num);

        },
        playPauseMusic() {
            if (audio.value.paused) {
                this.isPlaying = true;
                audio.value.play();
                this.resetLyric(audio.value.currentTime * 1000)
            } else {
                this.isPlaying = false;
                audio.value.pause();
                this.clearAllTimers()
            }
            console.log(audio.value.paused);

        },
        setSeconds(seconds: number) {
            audio.value.currentTime = seconds
            this.resetLyric(seconds * 1000)
        },
    },
    persist: {
        key: "musicData",
        omit: ['audio'],
    },
})
