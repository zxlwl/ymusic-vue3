<script setup lang="ts">
import { NImage } from 'naive-ui'
import { useMusicDataStore } from '../stores'
import { watch, ref, computed } from 'vue'

const musicDataStore = useMusicDataStore()
const lyricList = ref<HTMLElement | null>(null)

// Computed for safe access
const currentMusic = computed(() => {
    return musicDataStore.musicList[musicDataStore.nowPlaying] || {}
})

// Listen for lyric change
watch(() => musicDataStore.nowLyricIndex, (newVal) => {
    if (lyricList.value && lyricList.value.children[newVal]) {
        const activeEl = lyricList.value.children[newVal] as HTMLElement
        lyricList.value.scrollTo({
            top: activeEl.offsetTop - lyricList.value.clientHeight / 2 + activeEl.clientHeight / 2,
            behavior: 'smooth'
        })
    }
})
</script>

<template>
  <div class="play-interface">
    <!-- Blurred Background -->
    <div class="bg-blur" :style="{ backgroundImage: `url(${currentMusic.pic})` }"></div>
    <div class="bg-overlay"></div>
    
    <div class="play-content">
        <div class="play-left">
            <div class="cover-container">
                <n-image
                  :src="currentMusic.pic"
                  class="cover-image"
                  preview-disabled
                />
            </div>
            <div class="music-details">
                <h1 class="music-title">{{ currentMusic.name }}</h1>
                <p class="music-artist">{{ Array.isArray(currentMusic.artist) ? currentMusic.artist.join(', ') : currentMusic.artist }}</p>
                <p class="music-album">{{ currentMusic.album }}</p>
            </div>
        </div>
        
        <div class="play-right">
            <div class="lyric-wrapper">
                <div class="lyric-list" ref="lyricList">
                    <div v-if="!musicDataStore.lyric || musicDataStore.lyric.length === 0" class="no-lyric">
                        暂无歌词
                    </div>  
                    <div
                      v-else
                      v-for="(item, index) in musicDataStore.lyric"
                      :key="index"
                      class="lyric-line"
                      :class="{ current: index === musicDataStore.nowLyricIndex }"
                      @click="musicDataStore.setSeconds(musicDataStore.lyricTime[index]/1000)" 
                    >
                      {{ item }}
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.play-interface {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bg-blur {
    position: absolute;
    inset: -50px;
    background-size: cover;
    background-position: center;
    filter: blur(60px) brightness(0.6);
    z-index: 0;
    opacity: 0.5;
    transition: background-image 0.5s ease;
}

.bg-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.5));
    z-index: 1;
    backdrop-filter: blur(20px);
}

[data-theme="dark"] .bg-overlay {
    background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7));
}

.play-content {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    max-width: 1200px;
    display: flex;
    padding: 40px;
    gap: 60px;
    
    @media (max-width: 768px) {
        flex-direction: column;
        padding: 20px;
        gap: 20px;
    }
}

.play-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 500px;
}

.cover-container {
    width: 100%;
    aspect-ratio: 1;
    max-width: 400px;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    margin-bottom: 32px;
    transition: transform 0.3s ease;
    
    &:hover {
        transform: scale(1.02);
    }
}

.cover-image {
    width: 100%;
    height: 100%;
    
}

.music-details {
    text-align: center;
    color: var(--text-primary);
}

.music-title {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 8px;
    line-height: 1.2;
}

.music-artist {
    font-size: 1.2rem;
    color: var(--text-secondary);
    margin-bottom: 4px;
    font-weight: 500;
}

.music-album {
    font-size: 1rem;
    color: var(--text-tertiary);
}

.play-right {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0; 
}

.lyric-wrapper {
    width: 100%;
    height: 100%;
    max-height: 70vh;
    mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
}

.lyric-list {
    height: 100%;
    overflow-y: auto;
    padding: 50% 0; /* Allow scrolling first/last items to center */
    scrollbar-width: none;
    
    &::-webkit-scrollbar {
        display: none;
    }
}

.no-lyric {
    text-align: center;
    color: var(--text-secondary);
    font-size: 1.2rem;
    padding-top: 40%;
}

.lyric-line {
    text-align: left;
    padding: 12px 20px;
    font-size: 1.1rem;
    color: var(--text-secondary);
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    cursor: pointer;
    border-radius: 12px;
    opacity: 0.6;
    transform: scale(0.95);
    transform-origin: left center;
    
    &:hover {
        background: rgba(255,255,255,0.05);
        opacity: 0.8;
    }
    
    &.current {
        color: var(--text-primary); /* Use primary text color for better contrast on glass */
        font-size: 1.6rem;
        font-weight: 700;
        opacity: 1;
        transform: scale(1);
        text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
}

[data-theme="dark"] .lyric-line.current {
    color: #fff;
}
</style>
