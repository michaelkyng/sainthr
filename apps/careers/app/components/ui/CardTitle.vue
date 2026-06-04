<script setup lang="ts">
import { cn } from "~/lib/utils"
defineProps<{ class?: string }>()
</script>

<template>
  <h2
    :class="
      cn('font-display text-xl font-semibold text-ink', $props.class)
    "
  >
    <slot />
  </h2>
</template>
