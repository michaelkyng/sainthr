<script setup lang="ts">
import { cn } from "~/lib/utils"
defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('border-b border-line px-8 pb-6 pt-8', $props.class)">
    <slot />
  </div>
</template>
