<script setup lang="ts">
import { Label as RekaLabel } from "reka-ui"
import { cn } from "~/lib/utils"

const props = defineProps<{
  class?: string
  for?: string
  required?: boolean
}>()
</script>

<template>
  <RekaLabel
    :for="props.for"
    :class="cn('text-xs font-semibold text-ink', props.class)"
  >
    <slot />
    <span v-if="required" class="text-coral">&nbsp;*</span>
  </RekaLabel>
</template>
