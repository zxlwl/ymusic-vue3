<script setup lang="ts">
import { useUserStore } from "../stores";
const userStore = useUserStore();
</script>

<template>
    <div :style="{ color: userStore.themeType === 'light' ? '#000' : '#fff' }">
        <slot></slot>
    </div>
</template>