<script setup lang="ts">
import { cn } from "~/lib/utils"

defineProps<{ class?: string, align?: "start" | "end" }>()
</script>

<template>
  <div
    :class="
      cn(
        'absolute z-50 min-w-48 overflow-hidden rounded-2xl border border-line bg-white p-1 shadow-[0_16px_60px_rgba(16,30,68,0.18)]',
        'top-full mt-2',
        $props.align === 'end' ? 'right-0' : 'left-0',
        $props.class,
      )
    "
  >
    <slot />
  </div>
</template>
