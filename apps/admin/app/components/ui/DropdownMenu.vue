<script setup lang="ts">
const open = ref(false);

const close = () => (open.value = false);

provide('dropdown-close', close);
</script>

<template>
  <div class="relative" @keydown.escape="close">
    <slot :open="open" :toggle="() => (open = !open)" />
    <Teleport to="body">
      <div v-if="open" class="fixed inset-0 z-40" @click="close" />
    </Teleport>
  </div>
</template>
