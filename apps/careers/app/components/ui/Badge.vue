<script setup lang="ts">
import { type VariantProps, cva } from "class-variance-authority"
import type { HTMLAttributes } from "vue"
import { cn } from "~/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-ink/10 text-ink",
        mint: "bg-mint text-green",
        green: "bg-green/10 text-green",
        coral: "bg-coral/10 text-coral",
        blue: "bg-[#e8eeff] text-[#3b55c4]",
        gold: "bg-gold/10 text-gold",
        outline: "border border-line bg-white text-muted",
      },
    },
    defaultVariants: { variant: "default" },
  },
)

type BadgeVariants = VariantProps<typeof badgeVariants>

const props = defineProps<{
  variant?: BadgeVariants["variant"]
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <span :class="cn(badgeVariants({ variant }), props.class)">
    <slot />
  </span>
</template>
