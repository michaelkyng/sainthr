<script setup lang="ts">
import { cn } from '~/lib/utils';
defineProps<{ class?: string }>();
</script>
<template>
  <td :class="cn('px-5 py-4 align-middle', $props.class)"><slot /></td>
</template>
