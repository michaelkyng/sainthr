<script setup lang="ts">
import { cn } from '~/lib/utils';
defineProps<{ class?: string }>();
</script>
<template>
  <div :class="cn('flex gap-1 overflow-x-auto rounded-2xl border border-line bg-white p-1 shadow-sm', $props.class)">
    <slot />
  </div>
</template>
