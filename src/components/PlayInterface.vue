<script setup>
import { NIcon, NImage, NFlex, NList, NListItem } from 'naive-ui'
import { useMusicDataStore } from '../stores'
import { watch, ref } from 'vue'
const musicDataStore = useMusicDataStore()
//监听nowLyricIndex变化, 滚动到当前歌词位置
const lyricList = ref(null)
watch(() => musicDataStore.nowLyricIndex, (newVal, oldVal) => {
    if (newVal != oldVal) {
        // 滚动到当前歌词位置
        console.log(lyricList.value);

        lyricList.value.scrollTo({
            top: lyricList.value.children[newVal].offsetTop - lyricList.value.clientHeight / 2,
            behavior: 'smooth'
        })
    }
})
</script>


<template>
    <n-flex justify="space-evenly" align="center" style="height: 100%;width: 100%;">
        <div>
            <n-image :src="musicDataStore.musicList[musicDataStore.nowPlaying]?.pic"
                style="width: 45vmin;height: 45vmin;border-radius: 10%;"></n-image>
        </div>
        <div>
            <div style="transition: all 0.3s ease-in-out; height: 80vmin; overflow: auto; width: 45vmin; font-size: 16px; "
                ref="lyricList">
                <div v-for="(item, index) in musicDataStore.lyric" :key="index">
                    <div class="lyric-item" v-if="index != musicDataStore.nowLyricIndex">{{ item }}</div>
                    <div class="lyric-item" v-else style="font-size: 20px;font-weight: bold;">{{ item }}</div>
                </div>
            </div>
        </div>
    </n-flex>
</template>

<style lang="scss" scoped>
.n-image {
    img {
        width: 100%;
        height: 100%;
    }
}

.lyric-item {
    margin: 10px;
}

// 调节歌词列表的滚动条,隐藏滚动条

::-webkit-scrollbar {
    display: none;
}
</style>