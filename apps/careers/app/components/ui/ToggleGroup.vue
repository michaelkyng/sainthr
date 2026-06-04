<script setup lang="ts">
import {
  ToggleGroupRoot,
  type ToggleGroupRootEmits,
  type ToggleGroupRootProps,
  useForwardPropsEmits,
} from "reka-ui"
import { cn } from "~/lib/utils"

const props = defineProps<ToggleGroupRootProps & { class?: string }>()
const emits = defineEmits<ToggleGroupRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <ToggleGroupRoot
    v-bind="forwarded"
    :class="cn('flex flex-wrap gap-2', props.class)"
  >
    <slot />
  </ToggleGroupRoot>
</template>
