<script setup lang="ts">
import { cn } from "~/lib/utils"
defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('px-8 py-7', $props.class)">
    <slot />
  </div>
</template>
