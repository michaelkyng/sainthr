<script setup lang="ts">
import { type VariantProps, cva } from "class-variance-authority"
import type { HTMLAttributes } from "vue"
import { cn } from "~/lib/utils"

const cardVariants = cva("border", {
  variants: {
    variant: {
      default:
        "rounded-3xl border-line/50 bg-white shadow-[0_24px_80px_rgba(16,30,68,0.14)]",
      panel: "rounded-2xl border-line bg-panel",
      flat: "rounded-2xl border-line bg-white",
      dark: "rounded-2xl border-line bg-ink text-white",
    },
  },
  defaultVariants: { variant: "default" },
})

type Variants = VariantProps<typeof cardVariants>

const props = defineProps<{
  class?: HTMLAttributes["class"]
  variant?: Variants["variant"]
}>()
</script>

<template>
  <div :class="cn(cardVariants({ variant: props.variant }), props.class)">
    <slot />
  </div>
</template>
