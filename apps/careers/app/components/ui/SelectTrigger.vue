<script setup lang="ts">
import { ChevronDown } from "@lucide/vue"
import {
  SelectIcon,
  SelectTrigger,
  type SelectTriggerProps,
  useForwardProps,
} from "reka-ui"
import { cn } from "~/lib/utils"

const props = defineProps<SelectTriggerProps & { class?: string }>()

const delegated = computed(() => {
  const { class: _, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <SelectTrigger
    v-bind="forwarded"
    :class="
      cn(
        'flex w-full items-center justify-between rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-ink/40 disabled:cursor-not-allowed disabled:opacity-50 data-placeholder:text-muted [&>span]:line-clamp-1',
        props.class,
      )
    "
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDown class="size-4 text-muted" />
    </SelectIcon>
  </SelectTrigger>
</template>
