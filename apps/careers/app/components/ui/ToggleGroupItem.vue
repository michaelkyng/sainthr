<script setup lang="ts">
import { type VariantProps, cva } from "class-variance-authority"
import {
  ToggleGroupItem,
  type ToggleGroupItemProps,
  useForwardProps,
} from "reka-ui"
import { cn } from "~/lib/utils"

const toggleItemVariants = cva(
  "rounded-full border font-semibold transition-all duration-200",
  {
    variants: {
      variant: {
        ink:
          "border-line bg-paper text-muted hover:border-ink/30 hover:text-ink data-[state=on]:border-ink data-[state=on]:bg-ink data-[state=on]:text-white",
        green:
          "border-line bg-paper text-muted hover:border-ink/30 hover:text-ink data-[state=on]:border-ink/30 data-[state=on]:bg-ink/4 data-[state=on]:text-ink",
      },
      size: {
        default: "px-4 py-2 text-xs",
        sm: "px-3.5 py-1.5 text-xs",
      },
    },
    defaultVariants: { variant: "ink", size: "default" },
  },
)

type Variants = VariantProps<typeof toggleItemVariants>

const props = defineProps<
  ToggleGroupItemProps & {
    class?: string
    variant?: Variants["variant"]
    size?: Variants["size"]
  }
>()

const delegated = computed(() => {
  const { class: _c, variant: _v, size: _s, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <ToggleGroupItem
    v-bind="forwarded"
    :class="cn(toggleItemVariants({ variant: props.variant, size: props.size }), props.class)"
  >
    <slot />
  </ToggleGroupItem>
</template>
