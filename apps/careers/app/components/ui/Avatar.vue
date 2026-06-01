<script setup lang="ts">
import { AvatarRoot, type AvatarRootProps } from "reka-ui"
import { cn } from "~/lib/utils"

const props = defineProps<AvatarRootProps & { class?: string }>()

const delegated = computed(() => {
  const { class: _, ...rest } = props
  return rest
})
</script>

<template>
  <AvatarRoot
    v-bind="delegated"
    :class="cn('relative flex size-10 shrink-0 overflow-hidden rounded-full', props.class)"
  >
    <slot />
  </AvatarRoot>
</template>
