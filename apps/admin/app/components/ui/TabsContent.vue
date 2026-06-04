<script setup lang="ts">
defineProps<{ value: string; active: string }>();
</script>
<template>
  <div v-if="active === value">
    <slot />
  </div>
</template>
