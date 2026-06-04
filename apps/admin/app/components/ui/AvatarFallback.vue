<script setup lang="ts">
import { cn } from '~/lib/utils';
defineProps<{ class?: string }>();
</script>
<template>
  <span
    :class="cn('flex h-full w-full items-center justify-center rounded-2xl bg-ink text-xs font-bold text-white', $props.class)"
  >
    <slot />
  </span>
</template>
