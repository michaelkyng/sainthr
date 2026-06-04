<script setup lang="ts">
import { cn } from '~/lib/utils';
defineProps<{ class?: string }>();
</script>
<template>
  <div :class="cn('rounded-2xl border border-line bg-panel shadow-[0_16px_50px_rgba(16,30,68,0.06)]', $props.class)">
    <slot />
  </div>
</template>
