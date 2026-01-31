<script setup lang="ts">
import { useMusicDataStore } from "../stores";
import { NIcon, NEmpty } from 'naive-ui'
import { TrashBin, MusicalNotes } from '@vicons/ionicons5'
import { ref } from 'vue'

const musicStore = useMusicDataStore();
const hoveredIndex = ref(-1);

const formatDuration = (seconds: number) => {
    if (!seconds) return '--:--';
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
}
</script>

<template>
  <div class="music-list-container">
    <div v-if="musicStore.musicList.length === 0" class="empty-state">
        <n-empty description="播放列表为空">
            <template #icon>
                <n-icon :component="MusicalNotes" />
            </template>
        </n-empty>
    </div>
    
    <div v-else class="music-list">
        <TransitionGroup name="list">
            <div
              v-for="(item, index) in musicStore.musicList"
              :key="item.id || index"
              class="music-item"
              :class="{ playing: index === musicStore.nowPlaying }"
              @click="musicStore.playMusic(item)"
              @mouseenter="hoveredIndex = index"
              @mouseleave="hoveredIndex = -1"
            >
              <div class="music-index">
                  <span v-if="index !== musicStore.nowPlaying">{{ index + 1 }}</span>
                  <div v-else class="playing-indicator">
                      <span></span><span></span><span></span>
                  </div>
              </div>
              
              <div class="music-info">
                  <span class="music-name" :title="item.name">{{ item.name }}</span>
                  <span class="music-artist" :title="Array.isArray(item.artist) ? item.artist.join(', ') : item.artist">
                      {{ Array.isArray(item.artist) ? item.artist.join(', ') : (item.artist || 'Unknown Artist') }}
                  </span>
              </div>
              
              <div class="music-actions">
                  <span class="music-duration">{{ formatDuration(item.duration) }}</span>
                  <button
                    v-show="hoveredIndex === index"
                    type="button"
                    class="music-remove"
                    @click.stop="() => musicStore.removeMusic(index)"
                    aria-label="从列表移除"
                    title="移除"
                  >
                    <n-icon :component="TrashBin" size="18" />
                  </button>
              </div>
            </div>
        </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.music-list-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.empty-state {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-tertiary);
}

.music-list {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px;
}

.music-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  color: var(--text-primary);
  margin-bottom: 4px;
  border: 1px solid transparent;
  position: relative;
}

.music-item:hover {
  background: var(--bg-elevated);
  box-shadow: var(--shadow-sm);
  transform: translateX(2px);
}

.music-item.playing {
  background: var(--accent-soft);
  border-color: rgba(99, 102, 241, 0.2);
}

.music-index {
  width: 24px;
  flex-shrink: 0;
  font-size: 0.9rem;
  color: var(--text-tertiary);
  display: flex;
  justify-content: center;
}

.playing-indicator {
    display: flex;
    gap: 2px;
    align-items: flex-end;
    height: 12px;
}

.playing-indicator span {
    width: 3px;
    background-color: var(--accent);
    animation: bounce 1s infinite ease-in-out;
}

.playing-indicator span:nth-child(1) { animation-delay: 0s; height: 6px; }
.playing-indicator span:nth-child(2) { animation-delay: 0.2s; height: 12px; }
.playing-indicator span:nth-child(3) { animation-delay: 0.4s; height: 8px; }

@keyframes bounce {
    0%, 100% { transform: scaleY(0.5); }
    50% { transform: scaleY(1); }
}

.music-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.music-name {
  font-weight: 500;
  font-size: 0.95rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--text-primary);
}

.music-item.playing .music-name {
    color: var(--accent);
    font-weight: 600;
}

.music-artist {
    font-size: 0.8rem;
    color: var(--text-secondary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.music-actions {
    display: flex;
    align-items: center;
    gap: 12px;
}

.music-duration {
    font-size: 0.85rem;
    color: var(--text-tertiary);
    font-feature-settings: "tnum";
}

.music-remove {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  color: var(--text-tertiary);
  opacity: 0;
  transform: scale(0.8);
}

.music-item:hover .music-remove {
    opacity: 1;
    transform: scale(1);
}

.music-remove:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

/* List Transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
