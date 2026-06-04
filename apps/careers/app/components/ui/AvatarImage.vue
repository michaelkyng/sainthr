<script setup lang="ts">
import { AvatarImage, type AvatarImageProps } from "reka-ui"
import { cn } from "~/lib/utils"

const props = defineProps<AvatarImageProps & { class?: string }>()

const delegated = computed(() => {
  const { class: _, ...rest } = props
  return rest
})
</script>

<template>
  <AvatarImage
    v-bind="delegated"
    :class="cn('aspect-square size-full object-cover', props.class)"
  />
</template>
