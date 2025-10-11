<script setup>
import { NIcon, NImage, NFlex, NList, NListItem } from 'naive-ui'
import { useMusicDataStore } from '../stores'
import { watch, ref } from 'vue'
const musicDataStore = useMusicDataStore()
//监听nowLyricIndex变化, 滚动到当前歌词位置
const lyricList = ref(null)
watch(() => musicDataStore.nowLyricIndex, (newVal, oldVal) => {
    if (newVal != oldVal) {
        // const list = this.$refs.lyricList
        // console.log(lyricList.value);
        const list = lyricList.value
        console.log(list.$el.clientHeight / 2);
        list.$el.style.transition = 'all 0.3s ease-in-out'
        // list.$el.style.transform = 'translateY(' + (newVal * -list.$el.children[0].clientHeight) + list.$el.clientHeight / 2 + 'px)'
        list.$el.scrollTop = list.$el.children[newVal].offsetTop - list.$el.clientHeight / 2 - list.$el.children[newVal].clientHeight
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
            <n-list ref="lyricList" hoverable style=" height: 80vmin; overflow: auto; width: 45vmin; font-size: 16px; ">
                <n-list-item v-for="(item, index) in musicDataStore.lyric" :key="index">
                    <div v-if="index != musicDataStore.nowLyricIndex">{{ item }}</div>
                    <div v-else style="font-size: 20px;">{{ item }}</div>
                </n-list-item>
            </n-list>
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

// 调节歌词列表的滚动条,隐藏滚动条

::-webkit-scrollbar {
    display: none;
}
</style>