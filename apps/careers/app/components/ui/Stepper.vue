<script setup lang="ts">
import { cn } from "~/lib/utils"

const props = defineProps<{
  total: number
  current: number
  class?: string
}>()
</script>

<template>
  <div :class="cn('flex gap-1.5', props.class)">
    <div
      v-for="i in props.total"
      :key="i"
      :class="[
        'h-1 flex-1 rounded-full transition-all duration-500',
        i < props.current
          ? 'bg-ink/40'
          : i === props.current
            ? 'bg-ink'
            : 'bg-line',
      ]"
    />
  </div>
</template>
