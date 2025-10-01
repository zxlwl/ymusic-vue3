<script setup>
import { NFlex, NImage, NIcon } from 'naive-ui'
import { useMusicDataStore } from '../stores'
import { ArrowBarToUp } from '@vicons/tabler'
const musicDataStore = useMusicDataStore()
</script>

<template>
    <n-flex justify="space-between" align="center" style="height: 60px;width: 100%;padding: 5px;">
        <div class="imageDiv">
            <n-icon :component="ArrowBarToUp" size="24" class="imageIcon"></n-icon>
            <n-image preview-disabled width="50" height="50"
                :src="musicDataStore.musicList[musicDataStore.nowPlaying]?.pic" class="image"></n-image>
        </div>
        <div>
            <n-icon></n-icon>
        </div>
        <div></div>
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
</style>