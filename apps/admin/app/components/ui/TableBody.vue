<script setup lang="ts">
import { cn } from '~/lib/utils';
defineProps<{ class?: string }>();
</script>
<template>
  <tbody :class="cn('divide-y divide-line bg-white', $props.class)"><slot /></tbody>
</template>
