<script setup lang="ts">
import { cn } from '~/lib/utils';
defineProps<{ class?: string }>();
</script>
<template>
  <div :class="cn('px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted', $props.class)">
    <slot />
  </div>
</template>
