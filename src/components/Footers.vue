<script setup lang="ts">
import { NImage, NIcon, NSlider } from 'naive-ui'
import { useMusicDataStore, useTemporaryStore, audio } from '../stores'
import { ArrowBarToUp } from '@vicons/tabler'
import { ref, computed } from 'vue'

const musicDataStore = useMusicDataStore()
const temporaryStore = useTemporaryStore()
const seconds = ref(0)

const currentMusic = computed(() => {
    return musicDataStore.musicList[musicDataStore.nowPlaying] || {}
})

const changePlayType = () => {
    musicDataStore.playType++
    if (musicDataStore.playType > 3) {
        musicDataStore.playType = 1
    }
}

// Update progress
setInterval(() => {
    if (audio.value) {
        seconds.value = audio.value.currentTime
    }
}, 500)

// Listen for end
if (audio.value) {
    audio.value.addEventListener('ended', () => {
        musicDataStore.clearAllTimers()
        if (musicDataStore.playType == 1) {
            musicDataStore.playMusic(musicDataStore.musicList[musicDataStore.nowPlaying])
        } else if (musicDataStore.playType == 2) {
            let nextIndex = musicDataStore.nowPlaying + 1
            if (nextIndex >= musicDataStore.musicList.length) {
                nextIndex = 0
            }
            musicDataStore.nowPlaying = nextIndex
            musicDataStore.playMusic(musicDataStore.musicList[nextIndex])
        } else {
            musicDataStore.nowPlaying = Math.floor(Math.random() * musicDataStore.musicList.length)
            musicDataStore.playMusic(musicDataStore.musicList[musicDataStore.nowPlaying])
        }
    })
}

const changeCurrentTime = (value: number) => {
    musicDataStore.setSeconds(value)
}

const formatTime = (time: number) => {
    const min = Math.floor(time / 60)
    const sec = Math.floor(time % 60)
    return `${min}:${sec.toString().padStart(2, '0')}`
}
</script>

<template>
  <footer class="footer">
    <div class="progress-container">
      <n-slider
        v-model:value="seconds"
        @update:value="changeCurrentTime"
        :max="audio?.duration || 100"
        :tooltip="false"
        class="progress-slider"
      />
    </div>
    
    <div class="footer-content">
      <!-- Left: Cover & Info -->
      <div class="player-left">
        <div class="cover-wrapper" @click="temporaryStore.mainPlayInterface = !temporaryStore.mainPlayInterface">
          <div class="cover-hover-overlay">
            <n-icon :component="ArrowBarToUp" size="20" color="white" />
          </div>
          <n-image
            preview-disabled
            :src="currentMusic.pic || 'https://via.placeholder.com/64'"
            class="cover-img"
            style="width: 100%; height: 100%;"
          />
        </div>
        <div class="music-info">
          <div class="music-title truncate" :title="currentMusic.name">{{ currentMusic.name || '未播放' }}</div>
          <div class="music-artist truncate" :title="currentMusic.artist">{{ Array.isArray(currentMusic.artist) ? currentMusic.artist.join(', ') : (currentMusic.artist || 'Unknown') }}</div>
        </div>
      </div>

      <!-- Center: Controls -->
      <div class="player-center">
        <div class="controls">
          <button class="ctrl-btn sm" @click="musicDataStore.fastBackward(10)" title="后退10秒">
            <n-icon size="20"><div class="mgc_rewind_backward_10_line"></div></n-icon>
          </button>
          <button class="ctrl-btn" @click="musicDataStore.playPauseMusic()" title="播放/暂停">
            <n-icon size="40" class="play-icon">
              <div v-if="musicDataStore.isPlaying" class="mgc_pause_circle_fill"></div>
              <div v-else class="mgc_play_circle_fill"></div>
            </n-icon>
          </button>
          <button class="ctrl-btn sm" @click="musicDataStore.fastForward(10)" title="前进10秒">
            <n-icon size="20"><div class="mgc_rewind_forward_10_line"></div></n-icon>
          </button>
        </div>
      </div>

      <!-- Right: Actions -->
      <div class="player-right">
        <span class="time-display">{{ formatTime(seconds) }} / {{ formatTime(audio?.duration || 0) }}</span>
        <button class="ctrl-btn sm" @click="musicDataStore.downloadMusic(currentMusic)" title="下载">
          <n-icon size="20"><div class="mgc_download_2_line"></div></n-icon>
        </button>
        <button class="ctrl-btn sm" @click="changePlayType" title="播放模式">
          <n-icon size="20">
            <div v-if="musicDataStore.playType == 1" class="mgc_repeat_one_line"></div>
            <div v-else-if="musicDataStore.playType == 2" class="mgc_repeat_line"></div>
            <div v-else class="mgc_shuffle_2_line"></div>
          </n-icon>
        </button>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  background: transparent;
}

.progress-container {
  position: absolute;
  top: -6px;
  left: 0;
  width: 100%;
  height: 12px;
  z-index: 10;
  padding: 0;
  
  :deep(.n-slider) {
    --n-rail-height: 2px !important;
    --n-rail-color: rgba(0, 0, 0, 0.05) !important;
    --n-rail-color-hover: rgba(0, 0, 0, 0.1) !important;
    --n-fill-color: var(--accent) !important;
    --n-fill-color-hover: var(--accent-hover) !important;
    --n-handle-size: 0px !important;
    transition: all 0.2s;
    
    &:hover {
      --n-rail-height: 4px !important;
      --n-handle-size: 10px !important;
    }
  }
}

.footer-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  gap: 24px;
}

/* Left Section */
.player-left {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
}

.cover-wrapper {
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  flex-shrink: 0;
  
  &:hover .cover-hover-overlay {
    opacity: 1;
  }
}

.cover-img {
  width: 100%;
  height: 100%;
}

.cover-hover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 2;
}

.music-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.music-title {
  font-weight: 600;
  font-size: 1rem;
  color: var(--text-primary);
}

.music-artist {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

/* Center Section */
.player-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.controls {
  display: flex;
  align-items: center;
  gap: 24px;
}

.ctrl-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  border-radius: 50%;
  padding: 8px;
  
  &:hover {
    background: var(--bg-elevated);
    color: var(--accent);
    transform: scale(1.1);
    box-shadow: var(--shadow-sm);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  &.sm {
    color: var(--text-secondary);
    &:hover {
      color: var(--text-primary);
    }
  }
}

.play-icon {
  color: var(--accent);
  filter: drop-shadow(0 4px 6px var(--accent-soft));
}

/* Right Section */
.player-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
}

.time-display {
  font-size: 0.85rem;
  font-feature-settings: "tnum";
  color: var(--text-tertiary);
  margin-right: 8px;
}
.n-image{
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
