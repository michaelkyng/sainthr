<script setup lang="ts">
import { cn } from '~/lib/utils';
defineProps<{ class?: string }>();
</script>
<template>
  <div class="w-full overflow-x-auto">
    <table :class="cn('w-full min-w-[880px] text-sm caption-bottom', $props.class)">
      <slot />
    </table>
  </div>
</template>
