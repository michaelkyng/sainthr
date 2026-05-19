<script setup lang="ts">
import { cn } from '~/lib/utils';
defineProps<{ class?: string }>();
</script>
<template>
  <tr :class="cn('transition-colors hover:bg-panel-soft', $props.class)"><slot /></tr>
</template>
