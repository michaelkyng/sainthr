<script setup lang="ts">
import { type VariantProps, cva } from "class-variance-authority"
import { Primitive, type PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "~/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "rounded-full bg-ink text-white hover:bg-ink-2",
        secondary:
          "rounded-full border border-line bg-white text-ink hover:border-ink/30 hover:bg-paper",
        outline:
          "rounded-full border border-line bg-transparent text-ink hover:bg-paper",
        ghost: "rounded-full text-muted hover:text-ink",
        link: "text-ink underline-offset-4 hover:text-green hover:underline",
        destructive: "rounded-full bg-coral text-white hover:bg-coral/90",
        disabled: "cursor-not-allowed rounded-full bg-line text-muted",
      },
      size: {
        default: "px-6 py-2.5",
        sm: "px-4 py-2 text-xs",
        lg: "px-6 py-3.5",
        icon: "size-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
)

type ButtonVariants = VariantProps<typeof buttonVariants>

const props = defineProps<{
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  class?: HTMLAttributes["class"]
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  as?: PrimitiveProps["as"]
  asChild?: boolean
}>()
</script>

<template>
  <Primitive
    :as="asChild ? undefined : (as ?? 'button')"
    :as-child="asChild"
    :type="!asChild && (as ?? 'button') === 'button' ? (type ?? 'button') : undefined"
    :disabled="disabled || undefined"
    :class="cn(buttonVariants({ variant: disabled ? 'disabled' : variant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>
