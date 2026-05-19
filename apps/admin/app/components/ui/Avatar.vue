<script setup lang="ts">
import { cn } from '~/lib/utils';
defineProps<{ class?: string }>();
</script>
<template>
  <span :class="cn('relative flex size-10 shrink-0 overflow-hidden rounded-2xl', $props.class)">
    <slot />
  </span>
</template>
