<script setup lang="ts">
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '~/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-ink text-white hover:bg-ink-2 hover:shadow-lg hover:shadow-ink/10',
        secondary: 'border border-line bg-white text-ink hover:border-green/30 hover:bg-mint/30',
        ghost: 'text-muted hover:bg-panel-soft hover:text-ink',
        destructive: 'bg-coral text-white hover:bg-coral/90',
        outline: 'border border-line bg-transparent text-ink hover:bg-panel-soft',
        link: 'text-green underline-offset-4 hover:underline',
      },
      size: {
        default: 'px-4 py-2.5',
        sm: 'px-3 py-1.5 text-xs',
        lg: 'px-6 py-3.5',
        icon: 'size-9 rounded-xl',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

const props = defineProps<{
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
  class?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}>();
</script>

<template>
  <button
    :type="type ?? 'button'"
    :disabled="disabled"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </button>
</template>
