<script setup lang="ts">
import { AvatarFallback, type AvatarFallbackProps } from "reka-ui"
import { cn } from "~/lib/utils"

const props = defineProps<AvatarFallbackProps & { class?: string }>()

const delegated = computed(() => {
  const { class: _, ...rest } = props
  return rest
})
</script>

<template>
  <AvatarFallback
    v-bind="delegated"
    :class="cn('flex size-full items-center justify-center bg-ink font-display text-xs font-semibold text-white', props.class)"
  >
    <slot />
  </AvatarFallback>
</template>
