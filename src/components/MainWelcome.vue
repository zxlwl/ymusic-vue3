<script setup>
import Text from './Text.vue'
</script>

<template>
  <div class="welcome">
    <div class="welcome-card">
      <div class="welcome-icon">♪</div>
      <Text>
        <h2 class="welcome-title">Hi～</h2>
        <p class="welcome-desc">欢迎使用 Y-music，在顶部搜索歌曲开始播放</p>
      </Text>
    </div>
  </div>
</template>

<style scoped>
.welcome {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.welcome-card {
  text-align: center;
  padding: 48px 40px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
  max-width: 360px;
}

.welcome-icon {
  font-size: 3rem;
  margin-bottom: 16px;
  opacity: 0.9;
  color: var(--accent);
}

.welcome-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}

.welcome-desc {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}
</style>