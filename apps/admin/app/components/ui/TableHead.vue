<script setup lang="ts">
import { cn } from '~/lib/utils';
defineProps<{ class?: string }>();
</script>
<template>
  <th :class="cn('px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-[0.12em] text-muted', $props.class)">
    <slot />
  </th>
</template>
