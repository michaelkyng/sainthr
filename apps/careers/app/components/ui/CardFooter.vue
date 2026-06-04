<script setup lang="ts">
import { cn } from "~/lib/utils"
defineProps<{ class?: string }>()
</script>

<template>
  <div
    :class="
      cn(
        'flex items-center justify-between border-t border-line px-8 py-5',
        $props.class,
      )
    "
  >
    <slot />
  </div>
</template>
