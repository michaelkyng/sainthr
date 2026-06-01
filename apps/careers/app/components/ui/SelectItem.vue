<script setup lang="ts">
import { Check } from "@lucide/vue"
import {
  SelectItem,
  SelectItemIndicator,
  type SelectItemProps,
  SelectItemText,
  useForwardProps,
} from "reka-ui"
import { cn } from "~/lib/utils"

const props = defineProps<SelectItemProps & { class?: string }>()

const delegated = computed(() => {
  const { class: _, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <SelectItem
    v-bind="forwarded"
    :class="
      cn(
        'relative flex w-full cursor-default select-none items-center rounded-lg py-2 pl-8 pr-2 text-sm text-ink outline-none transition-colors data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-paper',
        props.class,
      )
    "
  >
    <span class="absolute left-2 flex size-4 items-center justify-center">
      <SelectItemIndicator>
        <Check class="size-4 text-ink" />
      </SelectItemIndicator>
    </span>
    <SelectItemText>
      <slot />
    </SelectItemText>
  </SelectItem>
</template>
