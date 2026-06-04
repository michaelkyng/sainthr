<script setup lang="ts">
import { cn } from "~/lib/utils"

defineProps<{ class?: string, destructive?: boolean }>()
const close = inject<() => void>("dropdown-close")
</script>

<template>
  <button
    type="button"
    :class="
      cn(
        'flex w-full cursor-pointer select-none items-center gap-2 rounded-xl px-3 py-2 text-sm outline-none transition-colors',
        destructive ? 'text-coral hover:bg-coral/10' : 'text-ink hover:bg-paper',
        $props.class,
      )
    "
    @click="close?.()"
  >
    <slot />
  </button>
</template>
