<script setup lang="ts">
import { NFlex, NImage, NIcon, NSlider } from 'naive-ui'
import { useMusicDataStore, useTemporaryStore, audio } from '../stores'
import { ArrowBarToUp, ArrowBigLeftLine, ArrowBigRightLine } from '@vicons/tabler'
import { Play, Pause } from '@vicons/ionicons5'
import { EdtLoop, Loop } from '@vicons/carbon'
import { Random } from '@vicons/fa'
import { ref } from 'vue'
const musicDataStore = useMusicDataStore()
const temporaryStore = useTemporaryStore()
const seconds = ref(0)
const changePlayType = () => {
    musicDataStore.playType++
    if (musicDataStore.playType > 3) {
        musicDataStore.playType = 1
    }
}
// const updateSeconds = 
setInterval(() => {
    seconds.value = audio.value.currentTime
}, 500)
// 监听音乐播放结束事件，清除定时器
audio.value.addEventListener('ended', () => {
    // clearInterval(updateSeconds)
    musicDataStore.clearAllTimers()
    // 循环播放
    if (musicDataStore.playType == 1) {
        musicDataStore.playMusic(musicDataStore.musicList[musicDataStore.nowPlaying])
    }
    // 顺序播放
    else if (musicDataStore.playType == 2) {
        musicDataStore.nowPlaying++
        if (musicDataStore.nowPlaying >= musicDataStore.musicList.length) {
            musicDataStore.nowPlaying = 0
        }
        musicDataStore.playMusic(musicDataStore.musicList[musicDataStore.nowPlaying])
    }
    // 随机播放
    else {
        musicDataStore.nowPlaying = Math.floor(Math.random() * musicDataStore.musicList.length)
        musicDataStore.playMusic(musicDataStore.musicList[musicDataStore.nowPlaying])
    }
})

const changeCurrentTime = (value: number) => {
    console.log(value);
    musicDataStore.setSeconds(value)
}
</script>

<template>
    <n-flex vertical justify="space-between" align="center" style="height: auto;width: 100%;padding: 5px;">
        <n-slider v-model:value="seconds" @update:value="(value: number) => changeCurrentTime(value)"
            :max="audio.duration" :tooltip="false" />
        <n-flex justify="space-between" align="center" style="flex: 1;width: 100%">
            <div class="imageDiv" @click="temporaryStore.mainPlayInterface = !temporaryStore.mainPlayInterface">
                <n-icon :component="ArrowBarToUp" size="24" class="imageIcon"></n-icon>

                <n-image preview-disabled width="50" height="50"
                    :src="musicDataStore.musicList[musicDataStore.nowPlaying]?.pic" class="image"></n-image>
            </div>
            <div>
                <n-icon @click="() => musicDataStore.fastBackward(5)" size="32" class="icon">
                    <div class="mgc_rewind_backward_10_line"></div>
                </n-icon>
                <n-icon v-if="musicDataStore.isPlaying" @click="musicDataStore.playPauseMusic()" size="32" class="icon">
                    <div class="mgc_pause_fill"></div>
                </n-icon>
                <n-icon v-else @click="musicDataStore.playPauseMusic()" size="32" class="icon">
                    <div class="mgc_play_fill"></div>
                </n-icon>
                <n-icon @click="() => musicDataStore.fastForward(5)" size="32" class="icon">
                    <div class="mgc_rewind_forward_10_line"></div>
                </n-icon>
            </div>
            <div>
                <n-icon @click="changePlayType" v-if="musicDataStore.playType == 1" size="32" class="icon">
                    <div class="mgc_repeat_one_line"></div>
                </n-icon>
                <n-icon @click="changePlayType" v-if="musicDataStore.playType == 2" size="32" class="icon">
                    <div class="mgc_repeat_line"></div>
                </n-icon>
                <n-icon @click="changePlayType" v-if="musicDataStore.playType == 3" size="32" class="icon">
                    <div class="mgc_shuffle_2_line"></div>
                </n-icon>
            </div>
        </n-flex>
    </n-flex>
</template>

<style scoped lang="scss">
.imageDiv {
    position: relative;

    .imageIcon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
    }

    .image {
        border-radius: 5px;

        &:hover {
            transform: scale(1.02);
            transition: all 0.2s;
            backdrop-filter: blur(20px);
            // background-color: rgba(32, 27, 27, 0.2);
        }
    }
}

.icon {
    margin: 10px;
}
</style>