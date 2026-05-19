<script setup lang="ts">
import { cn } from '~/lib/utils';
defineProps<{ class?: string }>();
</script>
<template>
  <thead :class="cn('border-b border-line bg-panel-soft', $props.class)"><slot /></thead>
</template>
