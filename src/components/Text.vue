<script setup lang="ts">
// import { useUserStore } from "../stores";
// const userStore = useUserStore();
</script>

<template>
  <div class="text-wrap">
    <slot />
  </div>
</template>

<style scoped>
.text-wrap {
  color: var(--text-primary);
}
</style>