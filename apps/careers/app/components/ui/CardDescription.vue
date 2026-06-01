<script setup lang="ts">
import { cn } from "~/lib/utils"
defineProps<{ class?: string }>()
</script>

<template>
  <p :class="cn('mt-0.5 text-sm text-muted', $props.class)">
    <slot />
  </p>
</template>
